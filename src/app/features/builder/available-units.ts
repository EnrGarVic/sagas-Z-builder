import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../../core/army-store.service';

@Component({
  selector: 'app-available-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-units.html',
  styleUrl: './available-units.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableUnitsComponent {
  readonly store = inject(ArmyStore);
}
