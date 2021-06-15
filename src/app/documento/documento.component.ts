import { Component, Input, EventEmitter, Output } from '@angular/core';
import {DocumentosService} from '../services/documentos.service';

@Component({
  selector: 'app-documento',
  templateUrl: 'documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {
  @Input()
  tituloDocumento!: string;
  @Output() documentoClicked = new EventEmitter();
  constructor(private documentosService: DocumentosService) {
  }

  onClicked(): void {
    this.documentosService.eliminarDocumento(this.tituloDocumento);
  }
}
