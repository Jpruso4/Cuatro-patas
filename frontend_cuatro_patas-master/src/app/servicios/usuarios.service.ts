import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GLOBAL } from './global';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Injectable()
export class UsuarioServicio {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.urlBackend;
    }

    public obtenerUsuarios(filtros): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.usuarios_obtenerlos, filtros).toPromise();
    }

    public login(data): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.login, data).toPromise();
    }

    public async obtenerUsuarioPorId(idUsuario) {
        return await this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.usuarios + '/' + idUsuario).toPromise();
    }

    public guardarUsuario(usuario): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.usuarios, usuario).toPromise();
    }

    public actualziarUsuario(usuario): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.usuarios, usuario).toPromise();
    }

    public eliminarUsuario(idUsu): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.usuarios_eliminar, { idUsuario: idUsu }).toPromise();
    }
}