import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input() progreso:number=80;

    // getPorcentaje(){
    //   return this.progreso+"%";//`${this.progreso}%`;
    // }

@Input('valor') progreso:number=80;
@Input() btnClass:string="btn-primary";

@Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

    cambiarValor(valor:number){
      this.progreso=this.progreso+valor;
      if(this.progreso>100){
          this.progreso= 100;
      }
      else if(this.progreso<0)
      {
         this.progreso= 0;
      }  
      this.valorSalida.emit(this.progreso);
      return this.progreso
    }

    onChange(nuevoValor:number){
      if(nuevoValor>100){
        this.progreso= 100;
      }
      else if(nuevoValor<0)
      {
        this.progreso= 0;
      }  
      else{
        this.progreso= nuevoValor;
      }
      this.valorSalida.emit(this.progreso);
    }

}
