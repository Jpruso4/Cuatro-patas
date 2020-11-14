import { Injectable } from '@angular/core';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificacionesServicio } from './notificaciones.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginServicio {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    constructor(
        private _router: Router,
        private _usuarioServicio: UsuarioServicio,
        private _notificacionesServicio: NotificacionesServicio
    ) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    async login(identificacion: String, clave: String) {
        let params = {
            identificacion: identificacion,
            clave: clave
        }        
        await this._usuarioServicio.login(params).then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                localStorage.setItem('currentUser', JSON.stringify(res.data[0]));
                this.currentUserSubject.next(res.data[0]);
                this._router.navigate(['/inicio']);
            } else {
                this.sendNotification(res.estado, res.mensaje);
            }
        })
    }

    public sendNotification(estado, mensaje) {
        if (estado) {
            this._notificacionesServicio.notificationSuccess(mensaje);
        } else {
            this._notificacionesServicio.notificationWarning(mensaje);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}