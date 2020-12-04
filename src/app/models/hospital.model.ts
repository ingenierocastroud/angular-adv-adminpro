/*import { environment } from 'src/environments/environment';

const base_url=environment.base_url;*/

interface _hospitalUser{
    _id:string;
    nombre:string;
    img:string;
}

export class Hospital {

    constructor(public nombre:string,public img:string,public id?:string,public usuario?:_hospitalUser){
    }

  /*  getImagen(){
        if(this.img){
            if(this.img.includes('google')){
                return this.img;
            }
            return `${base_url}/uploads/hospitales/${this.img}`;
        }
        return `${base_url}/uploads/hospitales/no-img` ;
    }*/

    getNombre(){
           return this.nombre;
    }
    
}