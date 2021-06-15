import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosComponent } from './documentos/documentos.component';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { DocumentsComponent } from './documents/documents.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
  {path: '', component: InicioComponent, canActivate: [SeguridadRouter]},
  {path: 'documentos', component: DocumentosComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'documents', component: DocumentsComponent, canActivate: [SeguridadRouter]},
  {path: 'autores', component: AutoresComponent, canActivate: [SeguridadRouter]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
