import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  get header(){
    return {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  }

  //usando fetch y no http
  async actualizarFoto(archivo:File,tipo:'usuarios'|'medicos'|'hospitales',id:string){
      try {
        const url=`${base_url}/uploads/${tipo}/${id}`;
        const formData=new FormData();
        formData.append('imagen',archivo);
        console.log(url);
        console.log(archivo);
        const resp =await fetch(url,{
          method:'PUT',
          headers: this.header ,
          body:formData
          }
        )
        const data = await resp.json();
        console.log(data);
        if(data.ok){
          return data.nombrearchivo;
        }
        return false;     
        
      } catch (error) {
        console.log(error);
        return false;
      }
  }
}
