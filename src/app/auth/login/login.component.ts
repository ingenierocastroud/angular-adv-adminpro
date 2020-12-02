import { Component ,NgZone,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public auth2LC:any;
  public formSubmitted=false;
  public loginForm=this.fb.group({
    email:[ localStorage.getItem('email')|| '',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]],
    recordarme:[localStorage.getItem('email') ? true : false]
  } 
  );

  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private router:Router,private ngZone:NgZone) { }

  ngOnInit(): void {
      this.renderButton();
  }

  login(){
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(
        resp=>{
          console.log(resp);
          if(this.loginForm.get('recordarme')?.value){
            localStorage.setItem('email',this.loginForm.get('email')?.value);
          }
          else{
            localStorage.removeItem('email');
          }
          console.log(localStorage.getItem('token'));
          this.router.navigateByUrl('/');      
        },(err)=>{
          Swal.fire('Error',err.error.msg,'error');
      }
    );


  }


 renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

 async startApp(){
      await this.usuarioService.initGoogle();
      this.auth2LC=this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element:any) {
    console.log(element.id);
    this.auth2LC.attachClickHandler(element, {},
        (googleUser:any)=>{
          var id_token = googleUser.getAuthResponse().id_token;
          console.log('token google');
          console.log(id_token);
          this.usuarioService.loginUsuarioGoogle(id_token)
          .subscribe(
            resp=>{
              this.ngZone.run(()=>{
              console.log('deberia redireccionar');
                this.router.navigateByUrl('/');
              }
              )}
         );
        }, 
        (error:any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
