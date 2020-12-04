import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy{

public hospitales:Hospital[]=[];
public hospitalesTemp:Hospital[]=[];
public cargando:boolean=true;
public imgSubs?:Subscription;

  constructor(private hospitalService:HospitalService, private modalImagenService:ModalImagenService,private busquedasService:BusquedasService) { }

  ngOnInit(): void {
      this.cargarHospitales();
      this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img:any)=>this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();   
  }


  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
        .subscribe((hospitales:Hospital[])=>{
            this.cargando=false;
            this.hospitales=hospitales;
            this.hospitalesTemp=this.hospitales;
            console.log(hospitales)
        });
  }

  abrirModalImagen(hospital:Hospital){
    console.log(hospital);
    if(hospital.id){
      this.modalImagenService.abrirModal('hospitales',hospital.id,hospital.img);
    }
  }

  buscar(termino:string){
    if(termino.length>0){
      this.cargando=true;
      this.busquedasService.buscar("hospitales",termino).subscribe((resp)=>{
          console.log(resp);
          this.hospitales=resp;
          this.cargando=false;
      });
    }
    else{
        this.hospitales=this.hospitalesTemp;
    }

  }

  async crearHospital(){

    const nombre = await Swal.fire({
      title: 'Ingrese la información del hospital',
      input: 'text',
      inputLabel: 'Nombre',
      showCancelButton: true
    })
    if ((nombre.value || '').trim().length>3){
      const hospital:Hospital=new Hospital(nombre.value,'')
      this.hospitalService.crearHospital(hospital).subscribe(
        hospital=>{
            console.log(hospital);
            this.hospitales.push(hospital);
            Swal.fire('Guardo','Hospital Creado','success');        
        },
        err=>{
          Swal.fire('Error',err.error.msg,'error');        
        }
      );
    }
   
  }

  actualizarHospital(hospital:Hospital){
        this.hospitalService.actualizarHospital(hospital).subscribe(
          resp=>{
              console.log(resp);
              Swal.fire('Actualizo','Hospital Actualizado','success');        
          },
          err=>{
            Swal.fire('Error',err.error.msg,'error');        
          }
        );
  }

}
