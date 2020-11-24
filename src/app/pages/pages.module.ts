import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule} from '@angular/router'


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';




@NgModule({
  declarations: [ 
     DashboardComponent,
      ProgressComponent,
       Grafica1Component,
       MaindashboardComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ 
    DashboardComponent,
     ProgressComponent,
      Grafica1Component,
      MaindashboardComponent 
    ]
})
export class PagesModule { }
