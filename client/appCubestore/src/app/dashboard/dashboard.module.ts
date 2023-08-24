import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardVendedorComponent } from './dashboard-vendedor/dashboard-vendedor.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    DashboardVendedorComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
