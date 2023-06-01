import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SiniaService } from './services/sinia.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoading: boolean = true;
  public valoresVacios: boolean = false;
  //variables para valores del formulario
  tematicaSelecc?:string;
  id_ubigeoSelecc?:string;
  nombre_ubigeoSelecc?:string ; 

  //variable para determinar Nacional o Departamental
  ambito?:any;

  //variable para obtener los indicadores;
  listaIndicadores:any[]=[];
  //variable para obtener indicadores filtrados por id,ambito,tematica
  listaIndicadoresFiltrada?: any[];

  valores:any[]=[];

  //variables para obtener los datos de indicador Seleccionado
  id_indicadorSelecc?:string;
  id_serieSelecc?:string;
  id_ambitoSelecc?:string;
  id_fuenteSelecc?:string;
  id_unidadSelecc?:string;
  id_indicadorNombreSelecc?:string;
  id_unidad_siglaSelecc?:string;
  id_dependenciaSelecc?:string;

  //lista para pasar los datos al hijo grafico
  listaDatosPadre:any[]=[];

  //lista para almacenar los datos de la ficha
  listaFichaPadre:any[]=[];

  constructor(private siniaService:SiniaService){}
  
  
  listaDatosIndicadores?: any[];
  private datosListosSubject: Subject<any[]> = new Subject<any[]>();
  datosListos$ = this.datosListosSubject.asObservable();

  mensajeNoDatos: string = '';

  ngOnInit(): void {
    this.obtenerIndicadores()
    
    
  }
  //llamar al servicio y obtener los indicadores Filtrados
  async obtenerIndicadores(){
    this.listaIndicadores = await this.siniaService.getIndicadoresEstaticos();

    const map = new Map();
    this.listaIndicadores.forEach(indicador =>{
      const id = indicador.id_indicador;
      const ambito = indicador.ambito;
      const tematicas = indicador.tematica;
      const key = id + "-" + ambito + "-" + tematicas;
      if(!map.has(key) || parseInt(indicador.id_serie) > parseInt(map.get(key).id_serie)){
        map.set(key,indicador);
      }
    });
    this.listaIndicadoresFiltrada = Array.from(map.values());
    this.isLoading = false;
  }
  
  


  //valores recibidos de Formulario
  recibirUbigeoTematica(parametros:any){
    this.id_ubigeoSelecc = parametros.ubigeo.value,
    this.nombre_ubigeoSelecc = parametros.ubigeo.nombre;
    this.tematicaSelecc = parametros.tematica;
    //para determinar si es Nacional o Departamental
    if(this.id_ubigeoSelecc == "00"){
      this.ambito = "Nacional"
    }else{
      this.ambito = "Departamental"
    }
    //para cuando no hay datos
    if (this.id_ubigeoSelecc == '00' && this.tematicaSelecc == '05') {
      
      this.mensajeNoDatos = "Lo sentimos, NONO disponemos de información sobre la temática seleccionada.";
    } else if (this.id_ubigeoSelecc !== '00' && (this.tematicaSelecc === '05' || this.tematicaSelecc === '07')) {
      this.mensajeNoDatos = "Lo sentimos, NONO disponemos de información sobre la temática seleccionada.";
    } else {
      this.mensajeNoDatos = ""; // No hay mensaje de no datos para otras combinaciones
    }
   
}

  //valores recibidos de Indicadores
  recibirDatosIndicador(datosIndicador:any){
    this.id_indicadorSelecc = datosIndicador.id_indicador;
    this.id_serieSelecc = datosIndicador .id_serie;
    this.id_ambitoSelecc = datosIndicador.id_ambito;
    this.id_fuenteSelecc = datosIndicador.id_fuente;
    this.id_unidadSelecc = datosIndicador.id_unidad;
    this.id_indicadorNombreSelecc = datosIndicador.id_indicadorNombre;
    this.id_unidad_siglaSelecc = datosIndicador.id_unidad_sigla;
    this.id_dependenciaSelecc = datosIndicador.id_fuenteInfo;
    
    
    this.getFichaDivulgacion();
    this.getDatos();
    //console.log(datosIndicador)
    
  }

  //llamar al servicio y obtener los datos
  async getDatos(){
    this.valoresVacios = false;
    this.valores =[]
    if(this.tematicaSelecc && this.id_serieSelecc && this.id_ubigeoSelecc && this.id_ambitoSelecc=="Departamental"){
      this.listaDatosPadre = await this.siniaService.getDatosDepartamentales(this.id_ubigeoSelecc,this.tematicaSelecc,this.id_serieSelecc, )
    }else if(this.tematicaSelecc && this.id_serieSelecc){
      this.listaDatosPadre = await this.siniaService.getDatosNacionales(this.tematicaSelecc,this.id_serieSelecc)
    }
    this.datosListosSubject.next(this.listaDatosPadre);
    this.isLoading = false;

    
    
  }

  //llamar al servicio y obtener la ficha de divulgacion
  async getFichaDivulgacion(){
    if(this.id_indicadorSelecc){
      this.listaFichaPadre = await this.siniaService.getFichaDivulgacion(this.id_indicadorSelecc);
      
    }

  }
}


