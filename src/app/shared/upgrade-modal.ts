import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../core/army-store.service';

@Component({
  selector: 'app-upgrade-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade-modal.html',
  styleUrl: './upgrade-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeModalComponent {
  readonly store = inject(ArmyStore);
}
