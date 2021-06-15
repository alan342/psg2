import {Documents} from './documents.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { PaginationDocuments } from './pagination-documents.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService{
baseUrl = environment.baseUrl;
private documentsLista: Documents[] = [];

documentSubject = new Subject();

  documentPagination!: PaginationDocuments;
documentPaginationSubject = new Subject<PaginationDocuments>();
constructor(private http: HttpClient){}

obtenerDocumentos(documentoPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any): void{
const request = {
pageSize: documentoPorPagina,
page: paginaActual,
sort,
sortDirection,
filterValue
};
this.http.post<PaginationDocuments>( this.baseUrl + 'api/Documento/Pagination', request)
.subscribe((response) => {
  this.documentPagination = response;
  this.documentPaginationSubject.next(this.documentPagination);
});
}
obtenerActualListener(){
  return this.documentPaginationSubject.asObservable();
}

guardarDocumento(document: Documents): void{

this.http.post(this.baseUrl + 'api/Documento', document)
.subscribe((response) => {
  this.documentSubject.next();
});
}
guardarDocumentoListener() {
  return this.documentSubject.asObservable();
}

}
