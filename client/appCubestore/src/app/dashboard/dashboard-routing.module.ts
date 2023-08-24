import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardVendedorComponent } from './dashboard-vendedor/dashboard-vendedor.component';

const routes: Routes = [
  {path:'dashboard/admin', component: DashboardAdminComponent},
  {path:'dashboard/vendedor', component: DashboardVendedorComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
