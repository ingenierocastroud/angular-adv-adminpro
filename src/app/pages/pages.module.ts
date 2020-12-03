import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';





@NgModule({
  declarations: [ 
     DashboardComponent,
      ProgressComponent,
       Grafica1Component,
       MaindashboardComponent,
       AccountSettingsComponent,
       PromesasComponent,
       RxjsComponent,
       PerfilComponent,
       UsuariosComponent,
       MedicosComponent,
       HospitalesComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,    
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    DashboardComponent,
     ProgressComponent,
      Grafica1Component,
      MaindashboardComponent ,
      AccountSettingsComponent,
      PromesasComponent,
      PerfilComponent
    ]
})
export class PagesModule { }
