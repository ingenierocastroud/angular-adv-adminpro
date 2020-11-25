import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
    public tittle1:string="Ventas" 
    public labels1 :string [] =['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public data1 =[
      [350, 450, 100]
     // [50, 150, 120],
    // [250, 130, 70],
  ];

  public tittle2:string="Compras" 
  public labels2 :string [] =['Download ventas', 'In-Store ventas', 'Mail-Order ventas'];
  public data2 =[
    [50, 150, 120]
  // [250, 130, 70],
];


public tittle3:string="Visitas" 
public labels3 :string [] =['Download Visitas', 'In-Store Visitas', 'Mail-Order Visitas'];
public data3 =[
 [250, 130, 70],
];


public tittle4:string="Lo quiero" 
public labels4 :string [] =['Download Lo quiero', 'In-Store Lo quiero', 'Mail-Order Lo quiero'];
public data4 =[
  [350, 150, 70]
];


   /* public colors1=[
      {backgroundColor:['#6857E6','#009FEE','#F02059']}
    ]*/
}
