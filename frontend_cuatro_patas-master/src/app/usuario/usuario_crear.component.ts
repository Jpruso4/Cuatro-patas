import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { GLOBAL } from '../servicios/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'usuario-crear',
    templateUrl: './usuario_crear.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio, NotificacionesServicio]
})

export class UsuarioCrearComponent {
    public titulo: string;
    public idUsuario;
    public usuario: Usuario;
    public formUsuario: FormGroup;
    public opcionesTipoDocumento: Array<string>;
    public tituloBtnLimpiarCampos: string;
    private clave: string;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio,
        public _fb: FormBuilder
    ) {
        this.usuario = new Usuario(0, 0, 0, '', '', '', '', '', '', '', '', 0, '', 0);
        this.opcionesTipoDocumento = ['C.C','T.I'];
        this.tituloBtnLimpiarCampos = 'Limpiar campos';
        this.formUsuario = this._fb.group({
            createdAt: ['', []],
            updatedAt: ['', []],
            id: ['', []],
            primerNombre: ['', [Validators.required, Validators.minLength(2)]],
            segundoNombre: ['', []],
            primerApellido: ['', [Validators.required, Validators.minLength(2)]],
            segundoApellido: ['', []],
            identificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
            correoElectronico: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
            estado: ['', []],
            tipoIdentificacion: ['', [Validators.required]],
            tipoUsuario: ['', []]
        });
    }

    onChanges() {
        this.formUsuario.get('tipoIdentificacion').valueChanges
            .subscribe(tipoIdSeleccionado => {
                tipoIdSeleccionado === '' ? this.formUsuario.invalid : this.formUsuario.valid;
            });
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.idUsuario = params['id'];
            if (this.idUsuario) {
                this.titulo = GLOBAL.titulosVistas.editarUsuarios;
                this.obtenerUsuarioPorId();
            } else {
                this.titulo = GLOBAL.titulosVistas.crearUsuarios;
            }
        })
    }

    public async guardarUsuario() {
        let respuesta;
        this.usuario = this.formUsuario.value;
        if (this.idUsuario) {
            respuesta = await this.actualizarUsuario();
        } else {
            respuesta = await this._usuarioServicio.guardarUsuario(this.usuario);
        }
        if (respuesta.estado) {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
            this.navegar(this.idUsuario ? 'lista-usuarios' : 'login');
        } else {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
        }
    }

    public async actualizarUsuario() {
        let usuarioActualizar = new Usuario(this.usuario.createdAt, this.usuario.updatedAt, this.usuario.id,
            this.usuario.primerNombre, this.usuario.segundoNombre, this.usuario.primerApellido,
            this.usuario.segundoApellido, this.usuario.identificacion, 
            this.usuario.clave ? this.usuario.clave : this.clave, 
            this.usuario.correoElectronico, this.usuario.celular, this.usuario.estado, 
            this.usuario.tipoIdentificacion, this.usuario.tipoUsuario
        )      
        return await this._usuarioServicio.actualziarUsuario(usuarioActualizar);
    }

    public sendNotification(estado, mensaje) {
        if (estado) {
            this._notificacionesServicio.notificationSuccess(mensaje);
        } else {
            this._notificacionesServicio.notificationWarning(mensaje);
        }
    }

    public navegar(lugar:string) {
        this._router.navigate(['/'+lugar]);
    }

    public async obtenerUsuarioPorId() {
        if (this.idUsuario) {
            let respuesta = await this._usuarioServicio.obtenerUsuarioPorId(this.idUsuario);
            if (respuesta.estado) {
                this.formUsuario.controls['identificacion'].disable();
                this.formUsuario.controls['clave'].setValidators([Validators.minLength(8), Validators.maxLength(30)]);
                this.clave = respuesta.data[0].clave;
                respuesta.data[0].clave = '';
                this.formUsuario.setValue(respuesta.data[0]);
            } else {
                this.sendNotification(respuesta.estado, respuesta.mensaje);
            }
        }
    }

    public limpiarCampos(){
        this.formUsuario.reset();
        this._router.navigate(['/registrarse']);
    }
}