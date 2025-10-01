import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../../core/army-store.service';

@Component({
  selector: 'app-army-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './army-panel.html',
  styleUrl: './army-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmyPanelComponent {
  readonly store = inject(ArmyStore);
}
