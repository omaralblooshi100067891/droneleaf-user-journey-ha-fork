import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { DroneLibraryComponent } from './private/drone-library/drone-library.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatButtonModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,DashboardComponent,DroneLibraryComponent]
})
export class HomePageModule {}
