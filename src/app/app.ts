import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyStore } from './core/army-store.service';

import { StartScreenComponent } from './features/start-screen';
import { SetupScreenComponent } from './features/setup-screen';
import { ArmyHeaderComponent } from './shared/army-header';
import { AvailableUnitsComponent } from './features/builder/available-units';
import { ArmyPanelComponent } from './features/builder/army-panel';
import { UpgradeModalComponent } from './shared/upgrade-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StartScreenComponent,
    SetupScreenComponent,
    ArmyHeaderComponent,
    AvailableUnitsComponent,
    ArmyPanelComponent,
    UpgradeModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly store = inject(ArmyStore);
}
