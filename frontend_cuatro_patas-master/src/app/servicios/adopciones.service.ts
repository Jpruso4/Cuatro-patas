import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GLOBAL } from './global';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Injectable()
export class AdopcionServicio {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.urlBackend;
    }

    public obtenerAdopciones(filtros): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.adopciones_obtenerlas, filtros).toPromise();
    }

    public async obtenerAdopcionPorId(idAdopcion) {
        return await this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.adopciones + '/' + idAdopcion).toPromise();
    }

    public guardarAdopcion(adopcion): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.adopciones, adopcion).toPromise();
    }

    public actualziarAdopcion(adopcion): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.adopciones, adopcion).toPromise();
    }

    public eliminarAdopcion(idAdopcion): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.adopciones_eliminar, { id: idAdopcion }).toPromise();
    }
}