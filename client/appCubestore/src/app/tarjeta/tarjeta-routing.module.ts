import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaIndexComponent } from './tarjeta-index/tarjeta-index.component';
import { TarjetaFormComponent } from './tarjeta-form/tarjeta-form.component';

const routes: Routes = [
  {path:'tarjeta', component: TarjetaIndexComponent},
  
  {path:'tarjeta/create', component: TarjetaFormComponent},

  {path:'tarjeta/update/:id', component: TarjetaFormComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaRoutingModule { }
