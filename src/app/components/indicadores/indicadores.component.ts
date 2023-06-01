import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnChanges{

  ngOnChanges(): void {
    this.seleccionarPrimerElemento();
  }

  @Output() parametrosDatosIndicador : EventEmitter<any> = new EventEmitter();
  
  //obtenemos los valores necesarios para pintar los indicadores del padre
  @Input() listaIndicadoresFiltradaIndi?:any;
  @Input() tematicaSeleccIndi?:any
  @Input() ubigeoSeleccIndi?:any
  @Input() ambitoNorDIndi?:any;

  //variable para seleccionar el primer radio de la lista indicadores
  indicadorSelecc:any

  seleccionarPrimerElemento(){
    if(this.listaIndicadoresFiltradaIndi && this.tematicaSeleccIndi && this.ambitoNorDIndi){
      const primerElemento = this.listaIndicadoresFiltradaIndi.find((item:any) => item.tematica === this.tematicaSeleccIndi && item.ambito === this.ambitoNorDIndi);
      if (primerElemento) {
        this.indicadorSelecc = primerElemento;
        //console.log(this.indicadorSelecc)
        this.enviarIndicadorSerie()
    }
    
    }
  }

  //enviar valores de los indicadores seleccionados al Padre
  enviarIndicadorSerie(){
    const datosIndicador  = {
      id_indicador:this.indicadorSelecc.id_indicador,
      id_serie:this.indicadorSelecc.id_serie,
      id_ambito:this.indicadorSelecc.ambito,
      id_fuente:this.indicadorSelecc.fuente,
      id_unidad:this.indicadorSelecc.unidad,
      id_indicadorNombre:this.indicadorSelecc.indicador,
      id_unidad_sigla:this.indicadorSelecc.unidad_sigla,
      id_fuenteInfo:this.indicadorSelecc.dependencia,
      
    }
    this.parametrosDatosIndicador.emit(datosIndicador);
  }
}
