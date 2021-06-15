import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent {
  usuarios = ['Alan', 'Maria', 'Nicol'];
  usuarioNombre = '';
  visible = false;
  constructor() {
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }
  onAgregarUsuario() {
    this.usuarios.push(this.usuarioNombre);
  }
}
