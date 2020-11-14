import { Component } from '@angular/core';
import { LoginServicio } from './servicios/login.service';
import { Usuario } from './modelos/usuario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Usuario;
  currentUserSubscription: Subscription;
  public mostrarInciarSesion: boolean;
  public usuarioAdmin: boolean;
  public mostrarMisAdopciones: boolean;

  constructor(
    private _loginServicio: LoginServicio,
    private _router: Router
  ) {
    this.mostrarMisAdopciones = false;
    this.currentUserSubscription = this._loginServicio.currentUser.subscribe(user => {
      let usuario = new Usuario(0, 0, 0, '', '', '', '', '', '', '', '', 0, '', 0); 
      this.currentUser = user ? user : usuario;
      if (user && user.tipoUsuario) {
        this.mostrarInciarSesion = true;
        this.usuarioAdmin = user.tipoUsuario === 1;
        this.mostrarMisAdopciones = this.mostrarInciarSesion && !this.usuarioAdmin;
      }
    });
  }

  logout(){
    this._loginServicio.logout();
    this.mostrarInciarSesion = false;
    this.mostrarMisAdopciones = false;
    this.usuarioAdmin = false;
    this._router.navigate(['/']);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
