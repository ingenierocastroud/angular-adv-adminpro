import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { map, tap,catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


const base_url=environment.base_url;

const headersGeneric = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
}

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) {
    this.initGoogle();
   }
  public auth2:any;

  initGoogle(){
    return new Promise(
     resolve=> {
      gapi.load('auth2',()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '1047320770774-a1fsmo99r4c3k24ramio0qpkhd6b6hl0.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
      resolve();
      }
    );

  };

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })

    });
  }

  validarToken():Observable<boolean>{
    return this.http.get(`${base_url}/auth/renew`,
      { headers: headersGeneric }
    )
    .pipe(
      tap((resp:any)=>{
          localStorage.setItem('token',resp.token);
      }),
      map(resp=>true) ,
      catchError(err=>of(false))   
    );
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
                  localStorage.setItem('token',resp.token);
              })
            )
  }

  loginUsuarioGoogle(token:string){
    return this.http.post(`${base_url}/auth/google`,{token})
            .pipe(
              tap((resp:any)=>{
                  localStorage.setItem('token',resp.token);
              })
            )
  }

}
