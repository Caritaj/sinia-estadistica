import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { DatosTablaComponent } from './components/datos-tabla/datos-tabla.component';
import { FichaComponent } from './components/ficha/ficha.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

//Angular Material
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    IndicadoresComponent,
    GraficoComponent,
    DatosTablaComponent,
    FichaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //Angular Material Imports
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatProgressSpinnerModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
