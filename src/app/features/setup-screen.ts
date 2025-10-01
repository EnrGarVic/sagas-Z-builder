import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../core/army-store.service';

@Component({
  selector: 'app-setup-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup-screen.html',
  styleUrls: ['./setup-screen.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupScreenComponent {
  readonly store = inject(ArmyStore);

  // === EVENT HANDLERS ===
  onArmyNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.store.armyName.set(target.value);
    }
  }

  onFactionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.store.selectedFaction.set(target.value);
    }
  }

  onPointLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.store.selectedPointLimit.set(+target.value);
    }
  }
}
