import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { map, tap,catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { PerfilForm } from '../interfaces/perfilForm.interface';
import { CargarUsuarios } from '../interfaces/cargarUsuarios.interface';


const base_url=environment.base_url;


declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  


  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) {
    this.initGoogle();
   }
  public auth2:any;
  public usuario?:Usuario;

  get header(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  }
  get uid(){
    return this.usuario?.uid || '';
  }

  initGoogle(){
    return new Promise(resolve=> {
      gapi.load('auth2',()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '1047320770774-a1fsmo99r4c3k24ramio0qpkhd6b6hl0.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });  
    })
  }

 
  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then((resp:any)=>{
      console.log('response logout');
      console.log(resp)
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })

    });
  }

  validarToken():Observable<boolean>{
   
    return this.http.get(`${base_url}/auth/renew`,
      { headers: this.header }
    )
    .pipe(
      map((resp:any)=>{
        console.log(resp.usuario);
        console.log(localStorage.getItem('token'))
          const {nombre,email,uid,img,role,google}=resp.usuario;
          this.usuario=new Usuario(nombre,email,uid,img,role,google,'');
          localStorage.setItem('token',resp.token);
          return true;
      }),
      catchError(err=>of(false))   
    );
  }

  actualizarPerfil(formData:PerfilForm){
   formData.rol=this.usuario?.role;
    return this.http.put(`${base_url}/usuarios/${this.uid}`,formData, { headers: this.header })
    .pipe(
      tap((resp:any)=>{
        console.log(resp);        
      })
    )
  }

  actualizarUsuario(usuario:Usuario){
    // formData.rol=this.usuario?.role;
     return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, { headers: this.header })
     .pipe(
       tap((resp:any)=>{
         console.log(resp);        
       })
     )
   }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
          .pipe(
            tap((resp:any)=>{
                localStorage.setItem('token',resp.token);
            })
          )
      }


  loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/auth`,formData)
            .pipe(
              tap((resp:any)=>{
                console.log(resp.token);                
                  localStorage.setItem('token',resp.token);
              })
            )
  }

  loginUsuarioGoogle(token:string){
    console.log('entro google');
    return this.http.post(`${base_url}/auth/google`,{token})
            .pipe(
              tap((resp:any)=>{
                console.log('respuetsa login google usuario');
                console.log(resp);
                  localStorage.setItem('token',resp.token);
              })
            )
  }

  cargarUsuarios(desde:number=0){
    return this.http.get<CargarUsuarios>(`${base_url}/usuarios?desde=${desde}`, { headers: this.header })
    .pipe(
      delay(500),
      map((resp:any)=>{
         const usuarios=resp.usuarios.map((user:Usuario)=>
         new Usuario(user.nombre,user.email,user.uid,user.img,user.role,user.google,''))
        return {
            total:resp.total,
            usuarios
        };
      })
    )
  }

}
