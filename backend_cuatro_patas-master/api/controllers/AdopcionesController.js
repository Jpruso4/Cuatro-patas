
const Utilidades = require('./UtilidadesController');
const UtilidadesAdopciones = require('./UtilidadesAdopcionesController');
const UtilidadesMascotas = require('./UtilidadesMascotasController');

module.exports = {
    obtenerAdopciones: async function (req, res) {
        try {
            const adopcionInfo = req.allParams();
            const limite = sails.limitePaginacionAdopciones;
            const skip = Number(adopcionInfo.pagina) * limite;
            const where = await UtilidadesAdopciones.obtenerFiltros(adopcionInfo.filtros);
            let adopciones = await Adopcion.find({ where: where, skip: skip, limit: limite }).sort('id DESC');
            if (!adopciones || adopciones.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_ADOPCIONES, res);
            } else {
                for (let i = 0; i < adopciones.length; i++) {
                    adopciones[i].estado = await Utilidades.obtenerEstado(adopciones[i].estado);
                }
                const cantidad = await UtilidadesAdopciones.obtenerCantidadDeAdopciones(where);
                const infoAdopciones = { adopciones: adopciones, cantidad: cantidad }
                Utilidades.respuestaRetorno(true, sails.constantes.ADOPCIONES_ENCONTRADAS, res, infoAdopciones);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_ADOPCIONES, res);
        }
    },
    obtenerAdopcionPorId: async function (req, res) {
        let adopcionInfo = req.allParams();
        try {
            let adopcion = await UtilidadesAdopciones.obtenerPorId(adopcionInfo.id);
            if (!adopcion || adopcion.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_ADOPCION, res);
            } else {
                Utilidades.respuestaRetorno(true, sails.constantes.ADOPCION_ENCONTRADA, res, adopcion);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_ADOPCION, res);
        }
    },
    crearAdopcion: async function (req, res) {
        let adopcionInfo = req.allParams();
        let adopcion = {
            direccion: adopcionInfo.direccion,
            ciudad: adopcionInfo.ciudad,
            barrio: adopcionInfo.barrio,
            estrato: adopcionInfo.estrato,
            primeraVezAdopta: adopcionInfo.primeraVezAdopta,
            cantidadMascotas: adopcionInfo.cantidadMascotas,
            recursosEconomicos: adopcionInfo.recursosEconomicos,
            hogarSeguro: adopcionInfo.hogarSeguro,
            todosSeguros: adopcionInfo.todosSeguros,
            porqueAdoptar: adopcionInfo.porqueAdoptar,
            idUsuario: adopcionInfo.idUsuario,
            nombreUsuario: adopcionInfo.nombreUsuario,
            idMascota: adopcionInfo.idMascota,
            nombreMascota: adopcionInfo.nombreMascota,
            estado: 1
        }
        await Adopcion.create(adopcion).then(async function() {
            await actualizarMascota(adopcionInfo.idMascota, false);
            Utilidades.respuestaRetorno(true, sails.constantes.ADOPCION_CREADA, res);
        }).catch((err) => {
            sails.log.debug(err);
            Utilidades.generarLogError(err);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_CREAR_ADOPCION, res);
        });
    },
    actualizarAdopcion: async function (req, res) {
        let adopcionInfo = req.allParams();
        if (adopcionInfo.id) {
            let adopcionExistente = await UtilidadesAdopciones.obtenerPorId(adopcionInfo.id);
            if (adopcionExistente.length > 0) {
                let adopcion = {
                    direccion: adopcionInfo.direccion,
                    ciudad: adopcionInfo.ciudad,
                    barrio: adopcionInfo.barrio,
                    estrato: adopcionInfo.estrato,
                    primeraVezAdopta: adopcionInfo.primeraVezAdopta,
                    cantidadMascotas: adopcionInfo.cantidadMascotas,
                    recursosEconomicos: adopcionInfo.recursosEconomicos,
                    hogarSeguro: adopcionInfo.hogarSeguro,
                    todosSeguros: adopcionInfo.todosSeguros,
                    porqueAdoptar: adopcionInfo.porqueAdoptar,
                    idUsuario: adopcionInfo.idUsuario,
                    nombreUsuario: adopcionInfo.nombreUsuario,
                    idMascota: adopcionInfo.idMascota,
                    nombreMascota: adopcionInfo.nombreMascota
                }
                await Adopcion.update(adopcionExistente[0].id, adopcion).then(() => {
                    Utilidades.respuestaRetorno(true, sails.constantes.ADOPCION_ACTUALIZADA, res);
                }).catch((err) => {
                    sails.log.debug(err);
                    Utilidades.generarLogError(err);
                    Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ACTUALIZAR_ADOPCION, res);
                });
            } else {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_ADOPCION, res);
            }
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ID_ADOPCION, res);
        }
    },
    eliminarAdopcion: async function (req, res) {
        let adopcionInfo = req.allParams();
        if (adopcionInfo.id) {
            let adopcionExistente = await UtilidadesAdopciones.obtenerPorId(adopcionInfo.id);
            if (adopcionExistente.length > 0) {
                let adopcion = {
                    estado: false
                }
                await Adopcion.update(adopcionExistente[0].id, adopcion).then(async function() {
                    await actualizarMascota(adopcionExistente[0].idMascota, 1);
                    Utilidades.respuestaRetorno(true, sails.constantes.ADOPCION_ELIMINADA, res);
                }).catch((err) => {
                    sails.log.debug(err);
                    Utilidades.generarLogError(err);
                    Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ELIMINAR_ADOPCION, res);
                });
            } else {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_ADOPCION, res);
            }
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ID_ADOPCION, res);
        }
    }
};

async function actualizarMascota(id, estado) {
    let mascotaExistente = await UtilidadesMascotas.obtenerPorId(id);
    if (mascotaExistente.length > 0) {
        let mascota = { estado: estado }
        await Mascota.update(id, mascota).then(() => {
            return true;
        }).catch((err) => {
            sails.log.debug(err);
            return false;
        });
    } else {
        console.log('No encontró la mascota');
        return false;
    }
}

