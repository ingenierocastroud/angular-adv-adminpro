import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {



  public medicos:Medico[]=[];
  public medicosTemp:Medico[]=[];
  public cargando:boolean=true;
  public imgSubs?:Subscription;
  
    constructor(private medicoService:MedicoService, private modalImagenService:ModalImagenService,private busquedasService:BusquedasService) { }
  
    ngOnInit(): void {
        this.cargarMedicos();
        this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img:any)=>this.cargarMedicos());
    }
  
    ngOnDestroy(): void {
      this.imgSubs?.unsubscribe();   
    }
  
  
    cargarMedicos(){
      this.cargando=true;
      this.medicoService.cargarMedicos()
          .subscribe((medicos:Medico[])=>{
              this.cargando=false;
              this.medicos=medicos;
              this.medicosTemp=this.medicos;
              console.log(medicos)
          });
    }
  
    abrirModalImagen(medico:Medico){
      console.log(medico);
      if(medico.id){
        this.modalImagenService.abrirModal('medicos',medico.id,medico.img);
      }
    }
  
    buscar(termino:string){
      if(termino.length>0){
        this.cargando=true;
        this.busquedasService.buscar("medicos",termino).subscribe((resp)=>{
            console.log(resp);
            this.medicos=resp;
            this.cargando=false;
        });
      }
      else{
          this.medicos=this.medicosTemp;
      }
  
    }
  
    async crearMedico(){
  
      const nombre = await Swal.fire({
        title: 'Ingrese la información del medico',
        input: 'text',
        inputLabel: 'Nombre',
        showCancelButton: true
      })
      if ((nombre.value || '').trim().length>3){
        const medico:Medico=new Medico(nombre.value,'')
        this.medicoService.crearMedico(medico).subscribe(
          medico=>{
              console.log(medico);
              this.medicos.push(medico);
              Swal.fire('Guardo','Medico Creado','success');        
          },
          err=>{
            Swal.fire('Error',err.error.msg,'error');        
          }
        );
      }
     
    }
  
 

}
