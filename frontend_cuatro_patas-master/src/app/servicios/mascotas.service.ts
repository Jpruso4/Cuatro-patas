import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Injectable()
export class MascotasServicio {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.urlBackend;
    }

    public obtenerMascotas(): Promise<HttpResponseApi> {
        return this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas).toPromise();
    }

    public obtenerMascotasFiltros(filtros): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas_obtenerlas, filtros).toPromise();
    }

    public async obtenerMascotaPorId(idMascota) {
        return await this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas + '/' + idMascota).toPromise();
    }

    public guardarMascota(mascota): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas, mascota).toPromise();
    }

    public actualziarMascota(mascota): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas, mascota).toPromise();
    }

    public eliminarMascota(idMascota): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.mascotas_eliminar, { id: idMascota }).toPromise();
    }
}