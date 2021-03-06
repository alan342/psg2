import { Injectable } from '@angular/core';
import {Autor} from './autor.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutoresService{
  baseUrl = environment.baseUrl;
private autoresLista: Autor[] = [];
private autoresSubject = new Subject<Autor[]>();
constructor(private http: HttpClient){}
obtenerAutores(): void {
  this.http.get<Autor[]>(this.baseUrl + 'api/RepositorioAutor')
  .subscribe((data) => {
    this.autoresLista = data;
    this.autoresSubject.next([...this.autoresLista]);
  });
}

obtenerActualListener(): any{
  return this.autoresSubject.asObservable();
}

}
