import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { DroneLibraryComponent } from './private/drone-library/drone-library.component';
import { AddDroneComponent } from './private/add-drone/add-drone.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatButtonModule,
    HomePageRoutingModule,
    SharedModule,
    MatIconModule,
    CoreModule
  ],
  declarations: [HomePage,DashboardComponent,DroneLibraryComponent,AddDroneComponent],
  exports:[AddDroneComponent]
})
export class HomePageModule {}
