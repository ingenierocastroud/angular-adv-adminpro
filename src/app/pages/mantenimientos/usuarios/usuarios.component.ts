import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

public totalUsuarios:number=0;
public desde:number=0;
public idUsuarioActual?:string;
public usuarios:Usuario[]=[];
public usuariosTemp:Usuario[]=[];
public cargando:boolean=true;
public usuario?:Usuario;
public imgSubs?:Subscription;

  constructor(private usuarioService:UsuarioService,private busquedasService:BusquedasService,
    private modalImagenService:ModalImagenService) {
    this.idUsuarioActual=usuarioService.uid;
    this.usuario=usuarioService.usuario;
   }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarUsuarios();
   this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img:any)=>this.cargarUsuarios());
  }

  abrirModalImagen(usuario:Usuario){
    console.log(Usuario);
    if(usuario.uid){
      this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
    }
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(
      ({total,usuarios})=>{
          this.cargando=false;
          this.totalUsuarios=total; 
          this.usuarios=usuarios;
          this.usuariosTemp=usuarios;
      }
    );
  }

  cambiarPagina(valor:number){
      this.desde +=valor;
      if (this.desde<0){
        this.desde=0;
      }
      else if (this.desde>=this.totalUsuarios){
        this.desde-=valor;
      }
      this.cargarUsuarios();
  
  }

  buscar(termino:string){
    if(termino.length>0){
      this.busquedasService.buscar("usuarios",termino).subscribe((resp)=>{
        console.log(resp);
          this.usuarios=resp;
      });
    }
    else{
        this.usuarios=this.usuariosTemp;
    }

  }

  cambiarRol(usuario:Usuario){
      console.log(usuario);
      this.usuarioService.actualizarUsuario(usuario).subscribe(
        resp=>{
          const {nombre,email,role}=resp.usuario;
          if(this.usuario){
            this.usuario.nombre=nombre;
            this.usuario.email=email;
            this.usuario.role=role;
          }   
         // Swal.fire('Exitoso','Datos Actualizados','success');        
        },
        err=>{
          console.log(err);
          Swal.fire('Error',err.error.msg,'error');        
        }
      );;
  }
  

}
