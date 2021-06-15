import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentosService} from '../services/documentos.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html'
})
export class DocumentosComponent implements OnInit, OnDestroy {
  documentos: any ;
constructor(private documentosService: DocumentosService){}
  private documentoSubscription!: Subscription;

eliminarDocumento(documento: any): void {

}

guardarDocumento(f: any): void {
    if (f.valid) {
this.documentosService.agregarDocumento(f.value.nombreDocumento);
    }
}

ngOnInit(): void {
  this.documentos  = this.documentosService.obtenerDocumentos();
  this.documentoSubscription = this.documentosService.documentosSubject.subscribe(() => {
  this.documentos = this.documentosService.obtenerDocumentos();
});

}

ngOnDestroy(): void {
  this.documentoSubscription.unsubscribe();
}
}
