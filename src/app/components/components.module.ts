import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficadonaComponent } from './graficadona/graficadona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';




@NgModule({
  declarations: [IncrementadorComponent, GraficadonaComponent, ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,GraficadonaComponent,ModalImagenComponent
  ]
})
export class ComponentsModule { }
