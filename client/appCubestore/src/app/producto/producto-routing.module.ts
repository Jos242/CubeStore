import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

const routes: Routes = [
  {path:'producto', component: ProductoIndexComponent},
  
  {path:'producto/:id', component: ProductoDetailComponent},

  {path:'producto/all', component: ProductoAllComponent},


  {path:'producto/all/:id', component: ProductoAllComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
