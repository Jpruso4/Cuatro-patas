import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { MascotasServicio } from '../servicios/mascotas.service';
import { Mascota } from '../modelos/mascota';

@Component({
    selector: 'mascota-lista',
    templateUrl: './mascota_lista.component.html',
    styleUrls: ['./mascota.component.css'],
    providers: [MascotasServicio, NotificacionesServicio]
})

export class MascotaListaComponent{
    public titulo:string;
    public listaMascotas: Array<Mascota>;
    public idMascota: number;
    public pagina: number;
    public paginas: number;
    public formFiltros: FormGroup;
    public filtros;
    public isCollapsed: boolean;

    constructor(
        private _router: Router,
        private _mascotaServicio: MascotasServicio,
        public _fb: FormBuilder,
        private _notificacionesServicio: NotificacionesServicio
    ){
        this.titulo = 'Lista de mascotas';
        this.pagina = 1;
        this.paginas = 0;
        this.formFiltros = this._fb.group({
            nombre: ['', []],
            raza: ['', []],
            edad: ['', []],
            genero: ['', []],
            tamanio: ['', []],
            personalidad: ['', []],
            color: ['', []],
            estado: ['', []]
        });
        this.isCollapsed = true;
    }

    ngOnInit(){        
        this.obtenerMascotas();
    }

    public obtenerMascotas(){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: this.pagina - 1
        }
        this._mascotaServicio.obtenerMascotasFiltros(filtros).then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                this.listaMascotas = res.data.mascotas;
                this.paginas = res.data.cantidad;                
            } else {
                this.sendNotification(res.estado, res.mensaje);
                this.listaMascotas = null;
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

    public detalleMascota(idMascota) {
        this._router.navigate(['/crear-mascota/' + idMascota]);
    }

    public async eliminarMascota() {
        await this._mascotaServicio.eliminarMascota(this.idMascota);
        this.listaMascotas = [];
        this.obtenerMascotas();
    }

    public asignarIdMascota(id) {
        this.idMascota = id;
    }

    public cambiarPagina(pagina: number){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: pagina - 1
        }
        this._mascotaServicio.obtenerMascotasFiltros(filtros).then((res: HttpResponseApi) => {
            this.listaMascotas = res.data.mascotas;
            this.paginas = res.data.cantidad;
        })
    }

    public limpiarFiltros() {
        this.formFiltros.reset();
        this.obtenerMascotas();
    }
}