import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get header(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  }

  buscar(tipo:'usuarios'|'medicos'|'hospitales',termino:string=''){
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, { headers: this.header })
    .pipe(
      delay(500),
      map((resp:any)=> {

        switch (tipo) {
          case 'usuarios':
            return resp.resultados.map((user:Usuario)=>
            new Usuario(user.nombre,user.email,user.uid,user.img,user.role,user.google,''));
                    
          default:
            break;
        }
        
      }
      )
    )
  }
}
