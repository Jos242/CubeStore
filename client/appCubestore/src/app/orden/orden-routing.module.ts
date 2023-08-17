import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenCheckoutComponent } from './orden-checkout/orden-checkout.component';


const routes: Routes = [
  {
    path: 'orden',
    component: OrdenIndexComponent
  },
  {
    path: 'orden/checkout',
    component: OrdenCheckoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
