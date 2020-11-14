import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { AdopcionServicio } from '../servicios/adopciones.service';
import { Adopcion } from '../modelos/adopcion';

@Component({
    selector: 'adopcion-lista',
    templateUrl: './adopcion_lista.component.html',
    styleUrls: ['./adopcion.component.css'],
    providers: [AdopcionServicio, NotificacionesServicio]
})

export class AdopcionListaComponent{
    public titulo:string;
    public listaAdopciones: Array<Adopcion>;
    public idAdopcion: number;
    public pagina: number;
    public paginas: number;
    public formFiltros: FormGroup;
    public filtros;
    public isCollapsed: boolean;

    constructor(
        private _router: Router,
        private _adopcionServicio: AdopcionServicio,
        public _fb: FormBuilder,
        private _notificacionesServicio: NotificacionesServicio
    ){
        this.titulo = 'Lista de adopciones';
        this.pagina = 1;
        this.paginas = 0;
        this.formFiltros = this._fb.group({
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

    public detalleAdopcion(idAdopcion) {
        this._router.navigate(['/crear-adopcion/' + idAdopcion]);
    }

    public async eliminarAdopcion() {
        await this._adopcionServicio.eliminarAdopcion(this.idAdopcion);
        this.listaAdopciones = [];
        this.obtenerAdopciones();
    }

    public asignarIdAdopcion(id) {
        this.idAdopcion = id;
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
        this.obtenerAdopciones();
    }
}