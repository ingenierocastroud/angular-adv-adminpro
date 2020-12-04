import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';




const routes: Routes = [

    {
        path:'dashboard',
        component:MaindashboardComponent,
        canActivate:[AuthGuard],
        children:[
          {path:'',component:DashboardComponent,data:{tittle:'Dashboard'}},
          {path:'progress',component:ProgressComponent,data:{tittle:'Progress Bar'}},
          {path:'grafica1',component:Grafica1Component,data:{tittle:'Gráfica #1'}},
          {path:'promesas',component:PromesasComponent,data:{tittle:'Promesas'}},
          {path:'rxjs',component:RxjsComponent,data:{tittle:'RXJS'}},
          {path:'perfil',component:PerfilComponent,data:{tittle:'Mi Perfil'}},
          {path:'account-settings',component:AccountSettingsComponent,data:{tittle:'Ajuste de Cuenta'}},          
          {path:'',redirectTo:'/dashboard',pathMatch:'full'},

          //Mantenimientos
          {path:'usuarios',component:UsuariosComponent,data:{tittle:'Usuarios App'}},
          {path:'medicos',component:MedicosComponent,data:{tittle:'Médicos'}},
          {path:'medico/:id',component:MedicoComponent,data:{tittle:'Médicos'}},
          {path:'hospitales',component:HospitalesComponent,data:{tittle:'Hospitales'}},
        ]
      }
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
