import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { from, Subscription } from 'rxjs';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-document-nuevo',
  templateUrl: 'document-nuevo.component.html',
})
export class DocumentNuevoComponent implements OnInit, OnDestroy {
  selectAutor: any ;
  selectAutorTexto: any ;
  fechaPublicacion: any ;
  @ViewChild(MatDatepicker)
  picker!: MatDatepicker<Date>;

  autores: Autor[] = [];

  autorSubscription!: Subscription;

  constructor(
    private documentService: DocumentsService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSubscription = this.autoresService
      .obtenerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  selected(event: MatSelectChange): void {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarDocumento(form: NgForm): void {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto,
      };

      const documentoRequest = {
        id: 'any',
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        fechaPublicacion: new Date(this.fechaPublicacion),
      };

      this.documentService.guardarDocumento(documentoRequest);
      this.autorSubscription = this.documentService.guardarDocumentoListener().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  ngOnDestroy(): void {
    this.autorSubscription.unsubscribe();
  }
}
