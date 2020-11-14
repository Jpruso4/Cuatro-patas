import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { NgxNotificationComponent } from 'ngx-notification';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

import { InicioComponent } from './inicio/inicio.component';
import { PorqueAdoptarComponent } from './porque_adoptar/porque_adoptar.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { LoginComponent } from './login/login.component';
import { UsuarioCrearComponent } from './usuario/usuario_crear.component';
import { UsuarioListaComponent } from './usuario/usuario_lista.component';
import { MascotaCrearComponent } from './mascota/mascota_crear.component';
import { MascotaListaComponent } from './mascota/mascota_lista.component';
import { AdopcionCrearComponent } from './adopcion/adopcion_crear.component';
import { AdopcionListaComponent } from './adopcion/adopcion_lista.component';
import { MisAdopcionesListaComponent } from './adopcion/mis_adopciones_lista.component';
import { ErrorComponent } from './error/error.component';
import { ModalAnimal } from './modal_animal/modal_animal.component';

import { UsuarioServicio } from './servicios/usuarios.service';
import { LoginServicio } from './servicios/login.service';
import { MascotasServicio } from './servicios/mascotas.service';
import { AdopcionServicio } from './servicios/adopciones.service';
import { NotificacionesServicio } from './servicios/notificaciones.service';

@NgModule({
  declarations: [
    AppComponent,
    NgxNotificationComponent,
    InicioComponent,
    PorqueAdoptarComponent,
    ContactanosComponent,
    LoginComponent,
    UsuarioCrearComponent,
    UsuarioListaComponent,
    MascotaCrearComponent,
    MascotaListaComponent,
    AdopcionCrearComponent,
    AdopcionListaComponent,
    MisAdopcionesListaComponent,
    ErrorComponent,
    ModalAnimal
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgbModule
  ],
  providers: [
    appRoutingProviders,
    UsuarioServicio,
    LoginServicio,
    MascotasServicio,
    AdopcionServicio,
    NotificacionesServicio
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
