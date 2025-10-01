import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from '../core/army-store.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartScreenComponent {
  readonly store = inject(ArmyStore);
}
