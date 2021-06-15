import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DocumentsService } from './documents.service';
import { Documents } from './documents.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DocumentNuevoComponent } from './document-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationDocuments } from './pagination-documents.model';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;
  documentData: Documents[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor'];
  dataSource = new MatTableDataSource<Documents>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;
  @ViewChild(MatPaginator)
  paginacion!: MatPaginator;

  private documentSubscription!: Subscription;

  totalDocumentos = 0;
  documentosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue: any ;

  constructor(
    private documentsService: DocumentsService,
    private dialog: MatDialog
  ) {}

  eventoPaginador(event: PageEvent): void {
    this.documentosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.documentsService.obtenerDocumentos(
      this.documentosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: any ): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.documentsService.obtenerDocumentos(
      this.documentosPorPagina,
      this.paginaActual,
      event.active,
      event.Direction,
      this.filterValue
    );
  }

  hacerfiltro(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(() => {
      if (event.keyCode !== 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };
        $this.filterValue = filterValueLocal;
        $this.documentsService.obtenerDocumentos(
          $this.documentosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);
  }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(DocumentNuevoComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.documentsService.obtenerDocumentos(
        this.documentosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ngOnInit(): void {
    this.documentsService.obtenerDocumentos(
      this.documentosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.documentSubscription = this.documentsService
      .obtenerActualListener()
      .subscribe((pagination: PaginationDocuments) => {
        this.dataSource = new MatTableDataSource<Documents>(pagination.data);
        this.totalDocumentos = pagination.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }
}
