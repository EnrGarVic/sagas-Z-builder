import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../core/army-store.service';

@Component({
  selector: 'app-army-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './army-header.html',
  styleUrls: ['./army-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmyHeaderComponent {
  readonly store = inject(ArmyStore);
}
