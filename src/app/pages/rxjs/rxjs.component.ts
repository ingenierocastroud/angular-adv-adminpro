import { Component, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry,take,map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

public intervalSubs:Subscription;

  constructor() { 
   
   // this.consumoObservable();
   //primera forma intervalo 
  //  this.retornaIntervalo().subscribe(
  //    (valor)=>console.log(valor)
  //  );
  //segunda forma 
   //  this.retornaIntervalo().subscribe(console.log);

     this.intervalSubs=this.retornaIntervalo2().subscribe(console.log);
  }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

  consumoObservable(){
    this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor=>console.log('Subs:',valor),
      error=>console.warn('Error observable',error),
      ()=> console.info('Observable finalizado')
    );
  }

  retornaIntervalo(){
    const intervalo$=interval(1000)
                    .pipe(
                      take(4),map(valor=>{
                        return "Hola Mundo "+valor+1
                      })
                    );
    return intervalo$;
  }

  retornaIntervalo2(){
    const intervalo$=interval(500)
                    .pipe( //orden importa map,filter y take , si take primero imprime hasta 10
                      map(valor=>{
                        return valor+1
                      }),
                      filter(valor => (valor%2===0) ? true:false),
                      take(10)
                    );
    return intervalo$;
  }

  retornaObservable(){
    let i=0;
    const obs$=new Observable<number>( observer=> {
 
      const interval= setInterval(()=>{
         i++;
          observer.next(i);
          if(i===4){
              clearInterval(interval);
              observer.complete();
          }
          if(i===2){
            observer.error('Errorsaso');
        } 
        },1000)       
    });

    return obs$;

  }

}
