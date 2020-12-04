import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit,OnDestroy {

  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];;
  public hospitalSeleccionado?:Hospital;
  public medicoSeleccionado?:Medico;

  constructor(private medicoService:MedicoService, private modalImagenService:ModalImagenService,
    private fb:FormBuilder,private hospitalService:HospitalService,private router:Router,
    private activatedRoute:ActivatedRoute) { 
      this.medicoForm= this.fb.group({
        nombre:['',Validators.required],
        hospital:['',Validators.required]
    })
  
      }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  this.cargarHospitales();

  this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId=>{
    this.hospitalSeleccionado=this.hospitales.find(h=>h.id===hospitalId);
  });

  this.activatedRoute.params.subscribe(params=>{ 
    this.cargarMedico(params.id);
  });

  }

cargarMedico(id:string){
  if (id==='nuevo'){
    return;
  }
  this.medicoService.cargarMedico(id)
  .subscribe(medico=>{  
    console.log(medico);
        this.medicoSeleccionado=medico;
        const {nombre,hospital:{_id}}=medico;
        this.medicoForm.setValue({nombre,hospital:_id});

  },
  err=>{
    this.router.navigateByUrl(`/dashboard/medicos`);
  }
  );
}
  
  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe((hospitales:Hospital[])=>{
            this.hospitales=hospitales;
            console.log(hospitales)
        });
  }

  guardarMedico(){
    if( this.medicoSeleccionado){
      const data={
        ...this.medicoForm.value
      }
      data.id=this.medicoSeleccionado.id;

      this.medicoService.actualizarMedico(data)
      .subscribe(resp=>{
        Swal.fire('Actualizo','Medico Actualizado','success'); 
    });
    }
    else{
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe(resp=>{
        Swal.fire('Guardo','Medico Creado','success'); 
        this.router.navigateByUrl(`/dashboard/medico/${resp.id}`);
    });
    }
     
  }

/*
  actualizarMedico(medico:Medico){
    this.medicoService.actualizarMedico(medico).subscribe(
      resp=>{
          console.log(resp);
          Swal.fire('Actualizo','Medico Actualizado','success');        
      },
      err=>{
        Swal.fire('Error',err.error.msg,'error');        
      }
    );
}
*/
abrirModalImagen(medico:Medico){
  console.log(medico);
  if(medico.id){
    this.modalImagenService.abrirModal('medicos',medico.id,medico.img);
  }
}

}
