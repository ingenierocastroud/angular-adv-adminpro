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
       {titulo:"Graficas", url:"grafica1"},
       {titulo:"Promesas", url:"promesas"},
       {titulo:"RXjs", url:"rxjs"}
     ]
    },
    {
      titulo:"Mantenimientos",
      icon:"mdi mdi-folder-lock-open",
       submenus:[
         {titulo:"Usuarios", url:"usuarios"},
         {titulo:"Hospitales", url:"hospitales"},
         {titulo:"Medicos", url:"medicos"}
       ]
      }
  ]

}
