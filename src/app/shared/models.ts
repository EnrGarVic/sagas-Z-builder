// --- DATABASE INTERFACES ---
export interface Unit {
  id: string;
  nombre: string;
  subtitulo: string;
  faccion: string;
  categoria: string;
  coste: number;
  heridas: number;
  entereza: number;
  velocidad: number;
  defensa: string;
  barraDeMejoras: string[];
  cualidades: string[];
}

export interface Upgrade {
  id: string;
  nombre: string;
  tipo: string;
  coste: number;
  restriccion: string;
  descripcion: string;
  noOcupaSlot?: boolean;
}

export interface UnitInArmy extends Unit {
  uid: string; // Unique per instance
  upgrades: Upgrade[];
}
