import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

  
  get header(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  }

  cargarMedicos(){
    return this.http.get<Medico[]>(`${base_url}/medicos`, { headers: this.header })
                    .pipe(
                      map( (resp:any)=>{
                          return resp.medicos;
                        }
                      )
                    );
  }

  cargarMedico(id:string){
    return this.http.get<Medico[]>(`${base_url}/medicos/${id}`, { headers: this.header })
                    .pipe(
                      map( (resp:any)=>{
                          return resp.medico;
                        }
                      )
                    );
  }

      crearMedico(formMedico:Medico){
      return this.http.post<Medico>(`${base_url}/hospitales`,formMedico, { headers: this.header })
              .pipe(
              map( (resp:any)=>{
                return resp.hospital;
              }
            )
          );
      }

      actualizarMedico(medico:Medico){
        console.log(medico);
        return this.http.put<Medico>(`${base_url}/medicos/${medico.id}`,medico, { headers: this.header })
                  .pipe(
                  map( (resp:any)=>{
                    return resp.hospital;
                  }
                )
              );
          }


}
