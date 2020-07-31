import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CscProductosComponent } from './components/csc-productos/csc-productos.component';
import { LectorexcelComponent } from './components/lectorexcel/lectorexcel.component';
import { ExportAsModule } from 'ngx-export-as';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path:'csvproductos', component: CscProductosComponent },
  { path:'lectorexcel', component: LectorexcelComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    FormularioComponent,
    CscProductosComponent,
    LectorexcelComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ExportAsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
