import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
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

const appRoutes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'porque-adoptar', component: PorqueAdoptarComponent },
    { path: 'contactanos', component: ContactanosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: UsuarioCrearComponent },
    { path: 'gestion-usuario/:id', component: UsuarioCrearComponent },
    { path: 'lista-usuarios', component: UsuarioListaComponent },
    { path: 'crear-mascota', component: MascotaCrearComponent },
    { path: 'crear-mascota/:id', component: MascotaCrearComponent },
    { path: 'lista-mascotas', component: MascotaListaComponent },
    { path: 'crear-adopcion', component: AdopcionCrearComponent },
    { path: 'crear-adopcion/:id', component: AdopcionCrearComponent },
    { path: 'lista-adopciones', component: AdopcionListaComponent },
    { path: 'mis-adopciones', component: MisAdopcionesListaComponent },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);