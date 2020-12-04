import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  get header(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  }

  cargarHospitales(){
    return this.http.get<Hospital[]>(`${base_url}/hospitales`, { headers: this.header })
                    .pipe(
                      map( (resp:any)=>{
                          return resp.hospitales;
                        }
                      )
                    );
  }

      crearHospital(formHospital:Hospital){
      return this.http.post<Hospital>(`${base_url}/hospitales`,formHospital, { headers: this.header })
              .pipe(
              map( (resp:any)=>{
                return resp.hospital;
              }
            )
          );
      }

      actualizarHospital(hospital:Hospital){
        console.log(hospital);
        return this.http.put<Hospital>(`${base_url}/hospitales/${hospital.id}`,hospital, { headers: this.header })
                  .pipe(
                  map( (resp:any)=>{
                    return resp.hospital;
                  }
                )
              );
          }


}
