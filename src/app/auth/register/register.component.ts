import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public formSubmitted=false;
  public registerForm=this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(1)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]],
    password2:['',[Validators.required,Validators.minLength(8)]],
    terminos:[false,[Validators.required]],
  },{
    validators:this.passwordsIguales('password','password2')
  }  
  );

  constructor(private fb:FormBuilder,private usuarioService:UsuarioService) {

   }


   crearUsuario(){
    this.formSubmitted=true;
    if (this.registerForm.invalid){
       return console.log("Formulario invalido");
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(resp=>{
        console.log(resp)
    },(err)=>{
        Swal.fire('Error',err.error.msg,'error');
    });
   }

   campoNoValido(campo:string):boolean{
      if (this.registerForm.get(campo)?.invalid && this.formSubmitted){
          return true;
      }
      return false;
  }

  terminosInvalido():boolean{
    if (!this.registerForm.get('terminos')?.value && this.formSubmitted){
        return true;
    }
    return false;
}


  passwordInvalido():boolean{
    const pass1=this.registerForm.get('password')?.value
    const pass2=this.registerForm.get('password2')?.value
    
    if ((pass1 !== pass2) && this.formSubmitted){
          return true;
      }
      return false;
    } 

    passwordsIguales(campo1:string,campo2:string){
      return (formGroup:FormGroup)=>{
        const pass1=formGroup.get(campo1)
        const pass2=formGroup.get(campo2)
        if (pass1?.value === pass2?.value){
            pass2?.setErrors(null);
        }
        else{
          pass2?.setErrors({passDiferentes:true});
        }
      }
    }
}



