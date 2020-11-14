import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { AdopcionServicio } from '../servicios/adopciones.service';
import { Adopcion } from '../modelos/adopcion';
import { Usuario } from '../modelos/usuario';

@Component({
    selector: 'mis-adopciones-lista',
    templateUrl: './mis_adopciones_lista.component.html',
    styleUrls: ['./adopcion.component.css'],
    providers: [AdopcionServicio, NotificacionesServicio]
})

export class MisAdopcionesListaComponent{
    public titulo:string;
    public listaAdopciones: Array<Adopcion>;
    public pagina: number;
    public paginas: number;
    public formFiltros: FormGroup;
    public filtros;
    public isCollapsed: boolean;
    private usuario: Usuario;

    constructor(
        private _router: Router,
        private _adopcionServicio: AdopcionServicio,
        public _fb: FormBuilder,
        private _notificacionesServicio: NotificacionesServicio
    ){
        this.titulo = 'Lista de adopciones';
        this.pagina = 1;
        this.paginas = 0;
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
        this.formFiltros = this._fb.group({
            idUsuario: [Number(this.usuario.id), []],
            adoptante: ['', []],
            mascota: ['', []],
            direccion: ['', []],
            ciudad: ['', []],
            barrio: ['', []],
            estrato: ['', []],
            estado: ['', []]
        });
        this.isCollapsed = true;
    }

    ngOnInit(){        
        this.obtenerAdopciones();
    }

    public obtenerAdopciones(){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: this.pagina - 1
        }
        this._adopcionServicio.obtenerAdopciones(filtros).then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                this.listaAdopciones = res.data.adopciones;
                this.paginas = res.data.cantidad;                
            } else {
                this.sendNotification(res.estado, res.mensaje);
                this.listaAdopciones = null;
                this.paginas = 0;
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

    public cambiarPagina(pagina: number){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: pagina - 1
        }
        this._adopcionServicio.obtenerAdopciones(filtros).then((res: HttpResponseApi) => {
            this.listaAdopciones = res.data.adopciones;
            this.paginas = res.data.cantidad;
        })
    }

    public limpiarFiltros() {
        this.formFiltros.reset();
        this.formFiltros.controls['idUsuario'].setValue(Number(this.usuario.id));
        this.obtenerAdopciones();
    }
}