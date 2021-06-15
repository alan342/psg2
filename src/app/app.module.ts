import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentoComponent } from './documento/documento.component';
import { DocumentosService } from './services/documentos.service';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './seguridad/seguridad.service';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsService } from './documents/documents.service';
import { DocumentNuevoComponent } from './documents/document-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    DocumentosComponent,
    DocumentoComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    DocumentsComponent,
    DocumentNuevoComponent,
    AutoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },
    DocumentosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DocumentNuevoComponent],
})
export class AppModule {}
