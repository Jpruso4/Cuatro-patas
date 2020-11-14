import { Component } from '@angular/core';
import { MascotasServicio } from '../servicios/mascotas.service';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { Mascota } from '../modelos/mascota';

@Component({
    selector: 'inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})

export class InicioComponent {

    public listaMascotas: Array<Mascota>;

    constructor(
        private _mascotaServicio: MascotasServicio,
        private _notificacionesServicio: NotificacionesServicio
    ){}

    ngOnInit(){        
        this.obtenerMascotas();
    }

    public obtenerMascotas(){
        this._mascotaServicio.obtenerMascotas().then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                this.listaMascotas = res.data;           
            } else {
                this.sendNotification(res.estado, res.mensaje);
                this.listaMascotas = null;
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

}