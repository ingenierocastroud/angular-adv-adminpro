import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-graficadona',
  templateUrl: './graficadona.component.html',
  styles: [
  ]
})
export class GraficadonaComponent  {

  @Input() tittle: string="Sin Titulo";
  @Input('labels') doughnutChartLabels: Label[]=[];
  @Input('data') doughnutChartData: MultiDataSet=[[]];


  public doughnutChartType: ChartType = 'doughnut';
  public colors:Color[]=[
    {backgroundColor:['#6857E6','#009FEE','#F02059']}
  ]

      // events
      public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
      }
    
      public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
      }

}
