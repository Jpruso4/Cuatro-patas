import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesServicio } from '../servicios/notificaciones.service';

@Component({
    selector: 'usuario-lista',
    templateUrl: './usuario_lista.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio, NotificacionesServicio]
})

export class UsuarioListaComponent{
    public titulo:string;
    public listaUsuarios: Array<Usuario>;
    public idUsuario: number;
    public pagina: number;
    public paginas: number;
    public formFiltros: FormGroup;
    public filtros;
    public isCollapsed: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio,
        public _fb: FormBuilder,
        private _notificacionesServicio: NotificacionesServicio
    ){
        this.titulo = 'Lista de usuarios';
        this.pagina = 1;
        this.paginas = 0;
        this.formFiltros = this._fb.group({
            desde: ['', []],
            hasta: ['', []],
            identificacion: ['', []],
            nombre: ['', []],
            correoElectronico: ['', []],
            celular: ['', []],
            estado: ['', []],
        });
        this.isCollapsed = true;
    }

    ngOnInit(){        
        this.obtenerUsuarios();
    }

    public obtenerUsuarios(){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: this.pagina - 1
        }
        this._usuarioServicio.obtenerUsuarios(filtros).then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                this.listaUsuarios = res.data.usuarios;
                this.paginas = res.data.cantidad;                
            } else {
                this.sendNotification(res.estado, res.mensaje);
                this.listaUsuarios = null;
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

    public detalleUsuario(idUsuario) {
        this._router.navigate(['/gestion-usuario/' + idUsuario]);
    }

    public async eliminarUsuario() {
        await this._usuarioServicio.eliminarUsuario(this.idUsuario);
        this.listaUsuarios = [];
        this.obtenerUsuarios();
    }

    public asignarIdUsuario(id) {
        this.idUsuario = id;
    }

    public cambiarPagina(pagina: number){
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: pagina - 1
        }
        this._usuarioServicio.obtenerUsuarios(filtros).then((res: HttpResponseApi) => {
            this.listaUsuarios = res.data.usuarios;
            this.paginas = res.data.cantidad;
        })
    }

    public limpiarFiltros() {
        this.formFiltros.reset();
        this.obtenerUsuarios();
    }
}