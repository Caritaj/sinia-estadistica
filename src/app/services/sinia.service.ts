import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SiniaService {


  //llamar a los indicadores
  async getIndicadores():Promise<any>{
    const res = await fetch(environment.apiUrlSNA09);
    const resJson = await res.json();
    return resJson.SNA09.data;
  }
  //LLAMAR A LOS INDICADORES ESTATICOS
  async getIndicadoresEstaticos():Promise<any>{
    const res = await fetch('assets/indicadores.json');
    const resJson = await res.json();
    return resJson.SNA09.data;
  }

  //llamar a los datos 
  async getDatosNacionales(tematica:string,serie:string):Promise<any>{
    const res = await fetch(environment.apiUrlSNA08N+tematica+'&serie='+serie);
    const resJson = await res.json();
    return resJson.SNA08.data;
  }
  async getDatosDepartamentales(ubigeo:string,tematica:string,serie:string):Promise<any>{
    const res = await fetch(environment.apiUrlSNA08D+ubigeo+'0000&marco='+tematica+'&serie='+serie);
    const resJson = await res.json();
    return resJson.SNA08.data;
  }
  //llamar a la ficha de divulgacion
  async getFichaDivulgacion(id_indicador:string):Promise<any>{
    const res = await fetch(environment.apiUrlANA10+id_indicador);
    const resJson = await res.json();
    return resJson.ANA10.data;
  }

}
