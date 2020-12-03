import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  constructor(public modalImagenService:ModalImagenService,private fileUploadService:FileUploadService) { }

  public imagenSubir?:File;
  public imgTemp:any=null;

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imgTemp=null;
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

actualizarFoto(){

  const id=this.modalImagenService.id;
  const tipo=this.modalImagenService.tipo;

  if(this.imagenSubir){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir,tipo,id)
    .then(img=>{
      Swal.fire('Exitoso','Imagen Actualizada','success'); 
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }
    ).catch(        
      err=>{
        console.log(err);
        Swal.fire('Error',err.error.msg,'error');        
      }
    );
  }
}

}
