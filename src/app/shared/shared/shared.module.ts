import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from "src/app/core/core.module";


@NgModule({
  declarations: [SidebarComponent,NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    IonicModule,
    CoreModule
],
  exports:[SidebarComponent,NavbarComponent]
})
export class SharedModule { }
