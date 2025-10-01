// src/app/core/army-store.service.ts
import { Injectable, computed, signal, inject } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Unit, Upgrade, UnitInArmy } from '../shared/models';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class ArmyStore {
  private readonly data = inject(DataService);

  // --- CATÁLOGOS ---
  factions = signal<string[]>(this.data.getFactions());
  pointLimits = [
    { value: 750, label: '750 puntos (Escaramuza Táctica)' },
    { value: 1000, label: '1000 puntos (Batalla Campal)' },
  ] as const;

  // --- ESTADO ---
  screen = signal<'start' | 'setup' | 'builder'>('start');
  armyName = signal('');
  selectedFaction = signal<string | null>(null);
  selectedPointLimit = signal<number | null>(null);
  armyList = signal<UnitInArmy[]>([]);
  selectedUnitForUpgrade = signal<UnitInArmy | null>(null);

  // --- DERIVADOS ---
  totalPoints = computed(() =>
    this.armyList().reduce((total, unit) => {
      const upgradesCost = unit.upgrades.reduce((s, up) => s + up.coste, 0);
      return total + unit.coste + upgradesCost;
    }, 0)
  );

  availableUnits = computed(() => {
    const faction = this.selectedFaction();
    if (!faction) return [];
    return this.data.UNIDADES_DB.filter((u) => u.faccion === faction);
  });

  validationErrors = computed(() => {
    const errors: string[] = [];
    const limit = this.selectedPointLimit();
    if (limit !== null && this.totalPoints() > limit) {
      errors.push(`¡Te has pasado del límite de puntos por ${this.totalPoints() - limit}!`);
    }
    const hasCommander = this.armyList().some((u) => u.categoria === 'Comandante (P)');
    if (!hasCommander && this.armyList().length > 0) {
      errors.push('El ejército debe tener al menos un Comandante (P).');
    }
    return errors;
  });

  availableUpgradesForSelectedUnit = computed(() => {
    const unit = this.selectedUnitForUpgrade();
    if (!unit) return [];
    const availableSlots = this.getAvailableSlots(unit);

    return this.data.MEJORAS_DB.filter((upgrade) => {
      const ok = this.checkRestriction(unit, upgrade);
      if (!ok) return false;
      if (upgrade.noOcupaSlot) return true;
      return availableSlots.includes(upgrade.tipo);
    });
  });

  // --- ACCIONES ---
  startNewArmy() {
    this.screen.set('setup');
  }

  createArmy() {
    if (this.selectedFaction() && this.selectedPointLimit() && this.armyName()) {
      this.screen.set('builder');
    }
  }

  addUnit(unit: Unit) {
    const uid = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const newUnit: UnitInArmy = { ...unit, uid, upgrades: [] };
    this.armyList.update((list) => [...list, newUnit]);
  }

  removeUnit(uid: string) {
    this.armyList.update((list) => list.filter((u) => u.uid !== uid));
  }

  isUnitAddDisabled(unit: Unit): boolean {
    const limit = this.selectedPointLimit();
    if (limit !== null && this.totalPoints() + unit.coste > limit) return true;
    if (this.armyList().some((u) => u.nombre === unit.nombre)) return true;
    return false;
  }

  openUpgradeModal(unit: UnitInArmy) {
    this.selectedUnitForUpgrade.set(unit);
  }
  closeUpgradeModal() {
    this.selectedUnitForUpgrade.set(null);
  }

  addUpgradeToUnit(upgrade: Upgrade) {
    const unitToUpgrade = this.selectedUnitForUpgrade();
    if (!unitToUpgrade) return;

    const limit = this.selectedPointLimit();
    if (limit !== null && this.totalPoints() + upgrade.coste > limit) return;

    this.armyList.update((list) =>
      list.map((u) =>
        u.uid === unitToUpgrade.uid ? { ...u, upgrades: [...u.upgrades, upgrade] } : u
      )
    );
    this.closeUpgradeModal();
  }

  removeUpgradeFromUnit(unitUid: string, upgradeId: string) {
    this.armyList.update((list) =>
      list.map((unit) => {
        if (unit.uid !== unitUid) return unit;
        const idx = unit.upgrades.findIndex((up) => up.id === upgradeId);
        if (idx < 0) return unit;
        const upgrades = [...unit.upgrades];
        upgrades.splice(idx, 1);
        return { ...unit, upgrades };
      })
    );
  }

  getAvailableSlots(unit: UnitInArmy): string[] {
    const total = [...unit.barraDeMejoras];
    const used = unit.upgrades.filter((up) => !up.noOcupaSlot).map((up) => up.tipo);

    for (const upgradeType of used) {
      const i = total.indexOf(upgradeType);
      if (i > -1) total.splice(i, 1);
    }

    return total;
  }

  checkRestriction(unit: Unit, upgrade: Upgrade): boolean {
    const r = upgrade.restriccion;
    if (r === 'Ninguna') return true;

    // "Solo X o Y"
    if (r.toLowerCase().includes(' o ')) {
      const parts = r.replace(/Solo /i, '').split(' o ');
      return parts.some((p) => unit.nombre.toLowerCase().includes(p.trim().toLowerCase()));
    }

    const restrictions = r.split(',').map((s) => s.trim().toLowerCase());

    // Las restricciones separadas por coma funcionan como OR (cualquiera es válida)
    return restrictions.some((restriction) => {
      if (restriction.startsWith('solo ')) {
        const target = restriction.substring(5);

        if (target.includes('unidades con la cualidad')) {
          const cualidad = target.split('cualidad ')[1];
          return unit.cualidades.some((q) => q.toLowerCase().includes(cualidad));
        }
        if (target === 'comandante (p)') {
          return unit.categoria.toLowerCase().includes(target);
        }
        if (target === 'androide') {
          return unit.faccion.toLowerCase().includes('androides');
        }
        return unit.nombre.toLowerCase().includes(target);
      }

      return (
        unit.faccion.toLowerCase().includes(restriction) ||
        unit.nombre.toLowerCase().includes(restriction) ||
        unit.cualidades.some((q) => q.toLowerCase().includes(restriction))
      );
    });
  }

  exportArmy() {
    const limit = this.selectedPointLimit();
    const doc = new jsPDF();

    // Configurar fuente y título
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`${this.armyName()}`, 20, 30);

    // Información del ejército
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Facción: ${this.selectedFaction()}`, 20, 45);
    doc.text(`Puntos: ${this.totalPoints()} / ${limit}`, 20, 55);

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);

    // Título de unidades
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('UNIDADES', 20, 80);

    let yPosition = 95;

    this.armyList().forEach((unit) => {
      // Verificar si necesitamos una nueva página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }

      let unitCost = unit.coste;

      // Nombre de la unidad
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${unit.nombre} (${unit.subtitulo}) - ${unit.coste} pts`, 25, yPosition);
      yPosition += 10;

      // Mejoras de la unidad
      if (unit.upgrades.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        unit.upgrades.forEach((upgrade) => {
          doc.text(`  - ${upgrade.nombre} - ${upgrade.coste} pts`, 30, yPosition);
          unitCost += upgrade.coste;
          yPosition += 8;
        });
      }

      // Coste total de la unidad
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.text(`  (Coste Total de Unidad: ${unitCost} pts)`, 30, yPosition);
      yPosition += 15;
    });

    // Generar el archivo PDF y descargarlo
    const fileName = `${this.armyName()
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()}_sagas_z.pdf`;
    doc.save(fileName);
  }

  downloadApp() {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sagas-z-builder.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
