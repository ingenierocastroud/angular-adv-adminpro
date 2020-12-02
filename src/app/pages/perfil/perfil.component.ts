import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  
  public usuario?:Usuario;
  public perfilForm:any;
  public imagenSubir?:File;
  public imgTemp:any=null;

  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private fileUploadService:FileUploadService) { 
      this.usuario=usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario?.nombre,Validators.required],
      email:[this.usuario?.email,[Validators.email,Validators.required]]
    })
  }

  actualizarPefil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      resp=>{
        const {nombre,email,uid,img,role,google}=resp.usuario;
        if(this.usuario){
          this.usuario.nombre=nombre;
          this.usuario.email=email;
        }
 
        Swal.fire('Exitoso','Datos Actualizados','success');        
      },
      err=>{
        console.log(err);
        Swal.fire('Error',err.error.msg,'error');        
      }
    );
  }
  actualizarFoto(){
    if(this.imagenSubir){
      this.fileUploadService
      .actualizarFoto(this.imagenSubir,"usuarios",this.usuario?.uid || '')
      .then(img=>{
        if(this.usuario){
          this.usuario.img=img
        }
        Swal.fire('Exitoso','Imagen Actualizada','success'); 
      }
      ).catch(        
        err=>{
          console.log(err);
          Swal.fire('Error',err.error.msg,'error');        
        }
      );
    }
  }
  cambiarImagen(event:any){
      this.imagenSubir=event.target.files[0];
      if (this.imagenSubir){
          const reader=new FileReader();
          reader.readAsDataURL(this.imagenSubir);
          reader.onloadend=()=>{
            this.imgTemp=reader.result;
          }
      }
      else{
        this.imgTemp=null;
      }
  }
}
