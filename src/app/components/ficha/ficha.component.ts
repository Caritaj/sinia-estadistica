import { Component, Input, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit{

  @Input() ListaFicha?:any;

  ngOnInit(): void {

  }
  descargarPDF() {
    const doc = new jsPDF();
    let startY = 10; // Posición vertical inicial
  
    for (const item of this.ListaFicha) {
      let contenido = `
        Nombre del Indicador:\n ${item.nombre}
        Descripción:\n ${item.descripcion}
        Finalidad:\n ${item.finalidad}
        Limitaciones:\n ${item.limitaciones}
        Elaborado por:\n ${item.fuente}
      `;
  
      if (item.metodologia) {
        contenido += `Metodología:\n ${item.metodologia}\n`;
      }
  
      startY = this.imprimirContenidoEnPaginas(contenido, doc, startY);
    }
  
    doc.save('Ficha_de_divulgación.pdf');
  }
  imprimirContenidoEnPaginas(contenido:any, doc:any, startY:any) {
    const lineSpacing = 10; // Espaciado entre líneas
    const lineHeight = doc.internal.getLineHeight() / doc.internal.scaleFactor;
  
    const contenidoDividido = doc.splitTextToSize(contenido, 180); // Anchura máxima de línea: 180
  
    let currentY = startY;
  
    for (let i = 0; i < contenidoDividido.length; i++) {
      if (currentY + lineHeight > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        currentY = 10 + lineSpacing;
      }
      doc.text(contenidoDividido[i], 10, currentY);
      currentY += lineSpacing;
    }
  
    return currentY;
  }

}
