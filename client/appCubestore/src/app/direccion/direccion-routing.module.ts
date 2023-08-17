import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionIndexComponent } from './direccion-index/direccion-index.component';
import { DireccionFormComponent } from './direccion-form/direccion-form.component';

const routes: Routes = [
  {path:'direccion', component: DireccionIndexComponent},
  
  {path:'direccion/create', component: DireccionFormComponent},

  {path:'direccion/update/:id', component: DireccionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionRoutingModule { }
