
const Utilidades = require('./UtilidadesController');
const UtilidadesMascotas = require('./UtilidadesMascotasController');
const UtilidadesMascotasController = require('./UtilidadesMascotasController');

module.exports = {
    obtenerMascotas: async function (req, res) {
        try {
            let mascotas = await Mascota.find({ where: {estado: 1} }).sort('id ASC');
            if (!mascotas || mascotas.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_MASCOTAS, res);
            } else {
                Utilidades.respuestaRetorno(true, sails.constantes.MASCOTAS_ENCONTRADAS, res, mascotas);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_MASCOTAS, res);
        }
    },
    obtenerMascotasFiltrado: async function (req, res) {
        try {
            const mascotaInfo = req.allParams();
            const limite = sails.limitePaginacionMascotas;
            const skip = Number(mascotaInfo.pagina) * limite;
            const where = await UtilidadesMascotas.obtenerFiltros(mascotaInfo.filtros);
            let mascotas = await Mascota.find({ where: where, skip: skip, limit: limite }).sort('id DESC');
            if (!mascotas || mascotas.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_MASCOTAS, res);
            } else {
                for (let i = 0; i < mascotas.length; i++) {
                    mascotas[i].estado = await Utilidades.obtenerEstado(mascotas[i].estado);
                }
                const cantidad = await UtilidadesMascotas.obtenerCantidadDeMascotas(where);
                const infoMascotas = { mascotas: mascotas, cantidad: cantidad }
                Utilidades.respuestaRetorno(true, sails.constantes.MASCOTAS_ENCONTRADAS, res, infoMascotas);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_MASCOTAS, res);
        }
    },
    obtenerMascotaPorId: async function (req, res) {
        let mascotaInfo = req.allParams();
        try {
            let mascota = await UtilidadesMascotas.obtenerPorId(mascotaInfo.id);
            if (!mascota || mascota.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_MASCOTA, res);
            } else {
                Utilidades.respuestaRetorno(true, sails.constantes.MASCOTA_ENCONTRADA, res, mascota);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_MASCOTA, res);
        }
    },
    crearMascota: async function (req, res) {
        let mascotaInfo = req.allParams();
        let mascota = {
            nombre: mascotaInfo.nombre,
            raza: mascotaInfo.raza,
            edad: mascotaInfo.edad,
            genero: mascotaInfo.genero,
            tamanio: mascotaInfo.tamanio,
            personalidad: mascotaInfo.personalidad,
            color: mascotaInfo.color,
            urlImagen: mascotaInfo.urlImagen,
            estado: 1
        }
        await Mascota.create(mascota).then(() => {
            Utilidades.respuestaRetorno(true, sails.constantes.MASCOTA_CREADA, res);
        }).catch((err) => {
            sails.log.debug(err);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_CREAR_MASCOTA, res);
        });
    },
    actualizarMascota: async function (req, res) {
        let mascotaInfo = req.allParams();
        if (mascotaInfo.id) {
            let mascotaExistente = await UtilidadesMascotas.obtenerPorId(mascotaInfo.id);
            if (mascotaExistente.length > 0) {
                let adocion = {
                    nombre: mascotaInfo.nombre,
                    raza: mascotaInfo.raza,
                    edad: mascotaInfo.edad,
                    genero: mascotaInfo.genero,
                    tamanio: mascotaInfo.tamanio,
                    personalidad: mascotaInfo.personalidad,
                    color: mascotaInfo.color,
                    urlImagen: mascotaInfo.urlImagen
                }
                await Mascota.update(mascotaExistente[0].id, adocion).then(() => {
                    Utilidades.respuestaRetorno(true, sails.constantes.MASCOTA_ACTUALIZADA, res);
                }).catch((err) => {
                    sails.log.debug(err);
                    Utilidades.generarLogError(error);
                    Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ACTUALIZAR_MASCOTA, res);
                });
            } else {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_MASCOTA, res);
            }
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ID_MASCOTA, res);
        }
    },
    eliminarMascota: async function (req, res) {
        let mascotaInfo = req.allParams();
        if (mascotaInfo.id) {
            let mascotaExistente = await UtilidadesMascotas.obtenerPorId(mascotaInfo.id);
            if (mascotaExistente.length > 0) {
                let mascota = {
                    estado: false
                }
                await Mascota.update(mascotaExistente[0].id, mascota).then(() => {
                    Utilidades.respuestaRetorno(true, sails.constantes.MASCOTA_ELIMINADA, res);
                }).catch((err) => {
                    sails.log.debug(err);
                    Utilidades.generarLogError(error);
                    Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ELIMINAR_MASCOTA, res);
                });
            } else {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_MASCOTA, res);
            }
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ID_MASCOTA, res);
        }
    }
};

