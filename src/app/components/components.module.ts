import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficadonaComponent } from './graficadona/graficadona.component';




@NgModule({
  declarations: [IncrementadorComponent, GraficadonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,GraficadonaComponent
  ]
})
export class ComponentsModule { }
