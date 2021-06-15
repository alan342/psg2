export interface Documents {
  id: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion?: Date;
  autor: {
    id: string,
    nombreCompleto: string
  };
}
