import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(
      (usuarios)=>{
        console.log(usuarios);
      }
    );

    /*PROMESAS BASICAS*/
  //   const promesa= new Promise((resolve,reject)=>{
  //     if (false){
  //       resolve("prome");
  //     }
  //     else{
  //       reject("algo salio mal");
  //     }
        
  //   });
  //   promesa
  //   .then((mensaje)=>{
  //     console.log(mensaje);
  //   })
  //   .catch(error => console.log("erroe",error));
  //   console.log("fin init");
    
  }

  getUsuarios(){
    const promesa=new Promise(resolve=>{

      fetch("https://reqres.in/api/users")
      .then(resp => resp.json())
      .then(body=>resolve(body.data));

    });

     return promesa;
  }
}
