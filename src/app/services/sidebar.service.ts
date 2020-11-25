import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu:any=[]=[
    {
    titulo:"Dashboard",
    icon:"mdi mdi-gauge",
     submenus:[
       {titulo:"Main", url:""},
       {titulo:"ProgressBar", url:"progress"},
       {titulo:"Graficas", url:"grafica1"}
     ]
    }
  ]

}
