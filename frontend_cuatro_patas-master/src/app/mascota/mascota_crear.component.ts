import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { GLOBAL } from '../servicios/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotasServicio } from '../servicios/mascotas.service';
import { Mascota } from '../modelos/mascota';
import { FileUploader } from 'ng2-file-upload';

const URL = '../../assets/img/';

@Component({
    selector: 'mascota-crear',
    templateUrl: './mascota_crear.component.html',
    styleUrls: ['./mascota.component.css'],
    providers: [MascotasServicio, NotificacionesServicio]
})

export class MascotaCrearComponent {
    public titulo: string;
    public idMascota;
    public mascota: Mascota;
    public formMascota: FormGroup;
    public tituloBtnLimpiarCampos: string;
    public opcionesGenero: Array<string>;
    public uploader: FileUploader;
    public response:string;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _mascotaServicio: MascotasServicio,
        public _fb: FormBuilder
    ) {
        this.mascota = new Mascota(0, 0, 0, '', '', '', '', '', '', '', '', 0);
        this.opcionesGenero = ['Macho', 'Hembra'];
        this.tituloBtnLimpiarCampos = 'Limpiar campos';
        this.formMascota = this._fb.group({
            createdAt: ['', []],
            updatedAt: ['', []],
            id: ['', []],
            nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            raza: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            edad: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
            genero: ['', [Validators.required]],
            tamanio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            personalidad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            urlImagen: ['', []],
            estado: ['', []]
        });

        this.uploader = new FileUploader({
            url: URL,
            disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            formatDataFunctionIsAsync: true,
            formatDataFunction: async (item) => {
                return new Promise((resolve, reject) => {             
                    resolve({
                        name: item._file.name,
                        length: item._file.size,
                        contentType: item._file.type,
                        date: new Date()
                    });
                });
            }
        });
        this.response = '';
        this.uploader.response.subscribe( res => this.response = res );
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.idMascota = params['id'];
            if (this.idMascota) {
                this.titulo = GLOBAL.titulosVistas.editarMascotas;
                this.obtenerMascotaPorId();
            } else {
                this.titulo = GLOBAL.titulosVistas.crearMascotas;
            }
        })
    }

    public async guardarMascota() {        
        let respuesta;
        this.mascota = this.formMascota.value;
        
        if (!this.idMascota) {
            if (this.uploader.queue && this.uploader.queue[0] && this.uploader.queue[0].file && this.uploader.queue[0].file.name) {
                this.mascota.urlImagen = '../../assets/img/' + this.uploader.queue[0].file.name;
            } else {
                this.sendNotification(false, 'Debe seleccionar una imágen.');
                return false;
            }
        } else {
            if (this.uploader.queue && this.uploader.queue[0] && this.uploader.queue[0].file && this.uploader.queue[0].file.name) {
                this.mascota.urlImagen = '../../assets/img/' + this.uploader.queue[0].file.name;            
            }
        }
        if (this.idMascota) {
            respuesta = await this._mascotaServicio.actualziarMascota(this.mascota);
        } else {
            respuesta = await this._mascotaServicio.guardarMascota(this.mascota);
        }
        if (respuesta.estado) {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
            this._router.navigate(['/lista-mascotas']);
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

    public async obtenerMascotaPorId() {
        if (this.idMascota) {
            let respuesta = await this._mascotaServicio.obtenerMascotaPorId(this.idMascota);
            if (respuesta.estado) {
                this.formMascota.setValue(respuesta.data[0]);
            } else {
                this.sendNotification(respuesta.estado, respuesta.mensaje);
            }
        }
    }

    public limpiarCampos() {
        this.formMascota.reset();
    }
}