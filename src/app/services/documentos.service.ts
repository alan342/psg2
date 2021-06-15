import { Subject } from 'rxjs';
export class DocumentosService {
  documentosSubject = new Subject();

  private documentos = ['derecho', 'sistemas', 'educacion'];

  agregarDocumento(documentoNombre: string): void {
    this.documentos.push(documentoNombre);
    this.documentosSubject.next();
  }

  eliminarDocumento(documentoNombre: string): void {
    this.documentos = this.documentos.filter(x => x !== documentoNombre);
    this.documentosSubject.next();
  }

  obtenerDocumentos(): string[]{
    return [...this.documentos];
  }
}
