import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

export class Usuario {

    constructor(public nombre:string,public email:string,public uid?:string,
        public img?:string,public role?:string,public google?:boolean,public password?:string){
    }

    getImagen(){
        if(this.img){
            if(this.img.includes('google')){
                return this.img;
            }
            return `${base_url}/uploads/usuarios/${this.img}`;
        }
        return `${base_url}/uploads/usuarios/no-img` ;
    }

    getNombre(){
           return this.nombre;
    }
    
    getEmail(){
        return this.email;
    }
}