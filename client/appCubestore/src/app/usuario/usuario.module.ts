import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    UsuarioLoginComponent,
    UsuarioCreateComponent,
    UsuarioIndexComponent
  ],
  imports: [CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule, UsuarioRoutingModule]
})
export class UsuarioModule { }
