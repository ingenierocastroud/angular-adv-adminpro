import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean=true;
  public tipo:any;
  public id:any;
  public img:any;  

  public nuevaImagen:EventEmitter<String>=new EventEmitter<String>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }
  abrirModal(tipo:'usuarios'|'hospitales'|'medicos',id:string,img:string=''){
    this._ocultarModal=false;
    this.tipo=tipo;
    this.id=id;
    console.log(img)
    console.log(tipo)
    this.img=this.getImagen(img,tipo);    
  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  getImagen(img:string,tipo:string){
    if(img){
        if(img.includes('google')){
            return this.img;
        }
        return `${base_url}/uploads/${tipo}/${img}`;
    }
    return `${base_url}/uploads/${tipo}/no-img` ;
  }

}
