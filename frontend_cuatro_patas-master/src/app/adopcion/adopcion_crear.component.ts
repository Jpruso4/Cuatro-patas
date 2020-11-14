import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { GLOBAL } from '../servicios/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adopcion } from '../modelos/adopcion';
import { Mascota } from '../modelos/mascota';
import { Usuario } from '../modelos/usuario';
import { AdopcionServicio } from '../servicios/adopciones.service';

@Component({
    selector: 'adopcion-crear',
    templateUrl: './adopcion_crear.component.html',
    styleUrls: ['./adopcion.component.css'],
    providers: [AdopcionServicio, NotificacionesServicio]
})

export class AdopcionCrearComponent {
    public titulo: string;
    public idAdopcion: number;
    public adopcion: Adopcion;
    private mascota: Mascota;
    private usuario: Usuario;
    public formAdopcion: FormGroup;
    public tituloBtnLimpiarCampos: string;
    public opcionesGenero: Array<string>;
    public response:string;
    public nombreUsuario: string;
    public nombreMascota: string;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _adopcionServicio: AdopcionServicio,
        public _fb: FormBuilder
    ) {
        this.adopcion = new Adopcion(0,0,0,'','','','',0,'',0,0,0,'',0,'',0,'',0);
        this.mascota = JSON.parse(localStorage.getItem('currentMascota'));
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
        this.tituloBtnLimpiarCampos = 'Limpiar campos';
        this.formAdopcion = this._fb.group({
            createdAt: ['', []],
            updatedAt: ['', []],
            id: ['', []],
            direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
            ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            barrio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            estrato: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
            primeraVezAdopta: ['', [Validators.required]],
            cantidadMascotas: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
            recursosEconomicos: ['', [Validators.required]],
            hogarSeguro: ['', [Validators.required]],
            todosSeguros: ['', [Validators.required]],
            porqueAdoptar: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            idUsuario: [this.usuario.id, []],
            nombreUsuario: [this.usuario.primerNombre + ' ' + this.usuario.primerApellido, []],
            idMascota: [Number(this.mascota.id), []],
            nombreMascota: [this.mascota.nombre, []],
            estado: ['', []]
        });
        this.nombreUsuario = this.usuario.primerNombre + ' ' + this.usuario.primerApellido;
        this.nombreMascota = this.mascota.nombre;
    }

    ngOnInit() {
        this.mascota = JSON.parse(localStorage.getItem('currentMascota'));
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
        this._route.params.forEach((params: Params) => {
            this.idAdopcion = params['id'];
            if (this.idAdopcion) {
                this.titulo = GLOBAL.titulosVistas.editarAdopciones;
                this.obtenerAdopcionPorId();
            } else {
                this.titulo = GLOBAL.titulosVistas.crearAdopciones;
            }
        })
    }

    public async guardarAdopcion() {        
        let respuesta;
        this.adopcion = this.formAdopcion.value;
        if (this.idAdopcion) {
            respuesta = await this._adopcionServicio.actualziarAdopcion(this.adopcion);
        } else {
            respuesta = await this._adopcionServicio.guardarAdopcion(this.adopcion);
        }
        if (respuesta.estado) {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
            let dirigir = this.usuario.tipoUsuario === 1 ? 'lista-adopciones' : 'inicio';
            this._router.navigate(['/'+dirigir]);
        } else {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
        }
    }

    public sendNotification(estado, mensaje) {
        if (estado) {
            this._notificacionesServicio.notificationSuccess(mensaje);
        } else {
            this._notificacionesServicio.notificationWarning(mensaje);
        }
    }

    public async obtenerAdopcionPorId() {
        if (this.idAdopcion) {
            let respuesta = await this._adopcionServicio.obtenerAdopcionPorId(this.idAdopcion);
            if (respuesta.estado) {
                this.formAdopcion.setValue(respuesta.data[0]);
            } else {
                this.sendNotification(respuesta.estado, respuesta.mensaje);
            }
        }
    }

    public limpiarCampos() {
        this.formAdopcion.reset();
    }

    ngOnDestroy() {
        localStorage.removeItem('currentMascota');
    }
}