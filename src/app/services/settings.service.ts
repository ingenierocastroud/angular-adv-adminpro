import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private elemento:any =  document.querySelector("#theme") ;

  constructor() { 
      this.loadTheme();
  }

  loadTheme(){
    const url=localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
      this.elemento.setAttribute('href',url);
  }

  changeTheme(theme:string,elementos:NodeListOf<Element>){

    const url=`./assets/css/colors/${theme}.css`
    this.elemento.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme(elementos);
  }

  checkCurrentTheme(elementos:NodeListOf<Element>){

    elementos.forEach(elemen=>{
        elemen.classList.remove('working');
        const btnTheme=elemen.getAttribute('data-theme');
        const btnThemeUrl =`./assets/css/colors/${btnTheme}.css`;
        const currentTheme= this.elemento.getAttribute('href');
        if (btnThemeUrl==currentTheme){
            elemen.classList.add('working');
        }
    })
  }
}
