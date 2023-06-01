import {  AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import { ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-datos-tabla',
  templateUrl: './datos-tabla.component.html',
  styleUrls: ['./datos-tabla.component.css']
})
export class DatosTablaComponent implements OnChanges,AfterViewInit{
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }



  //datos del padre para graficar los datos
  @Input() unidadData:any;
  @Input() unidad_siglaData:any;
  @Input() fuenteTabla:any;
  @Input() dependeciaTabla:any;
  @Input() nombreIndicadorTabla:any;
  @Input() ListaDatosPadre:any;

  //creamos las variables para los datos y la tabla
  categorias: any[] = [];
  valores: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoria', 'valor'];

  //@ViewChild(MatSort, { static: true }) sort!: MatSort;


  ngOnChanges(): void {
    this.valoresTabla();
  }
  valoresTabla() {
    if (this.ListaDatosPadre) {
      this.ListaDatosPadre.forEach((item: any) => {
        this.categorias.push(parseInt(item.periodo));
        this.valores.push(parseFloat(item.valor));
      });
      this.dataSource = new MatTableDataSource(this.ListaDatosPadre);
      //this.dataSource.sort = this.sort;
    }
  }
  //funcion para exportar los datos en excel
  exportAsExcel(): void {
    const currentDate = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    const fileName = `datos-${currentDate}.xlsx`;
    const title = [this.nombreIndicadorTabla];
    const headers = ['Periodo', this.unidadData + ' (' + this.unidad_siglaData + ')'];
    const data = this.dataSource.data.map(item => [item.categoria, item.valor]);
  
    const footer = [
      ['Fuente: '+this.fuenteTabla+' - '+ this.dependeciaTabla],
      ['Descargado desde el SISTEMA NACIONAL DE INFORMACIÓN E INNOVACIÓN AMBIENTAL'],
      [new Date().toLocaleString('es-PE')]
    ];
  
    const dataWithHeaders = [title, [], headers, ...data,[], ...footer];
  
    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
