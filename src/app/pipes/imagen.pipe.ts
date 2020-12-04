import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:'usuarios'|'medicos'|'hospitales'): unknown {
    if(img){
      if(img.includes('google')){
          return img;
      }
      return `${base_url}/uploads/${tipo}/${img}`;
    }
     return `${base_url}/uploads/${tipo}/no-img` ;
  }

}
