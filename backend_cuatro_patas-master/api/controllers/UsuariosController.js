/**
 * UseriossController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Utilidades = require('./UtilidadesController');
const UtilidadesUsuarios = require('./UtilidadesUsuariosController');

module.exports = {
    obtenerUsuarios: async function (req, res) {
        try {
            const usuarioInfo = req.allParams();
            const limite = sails.limitePaginacionUsuarios;
            const skip = Number(usuarioInfo.pagina) * limite;
            const where = await UtilidadesUsuarios.obtenerFiltros(usuarioInfo.filtros);
            let usuarios = await Usuario.find({
                where: where,
                skip: skip,
                limit: limite
            }).sort('id DESC');
            if (!usuarios || usuarios.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_USUARIOS, res);
            } else {
                for (let i = 0; i < usuarios.length; i++) {
                    usuarios[i].estado = await Utilidades.obtenerEstado(usuarios[i].estado);
                    usuarios[i].tipoIdentificacion = await Utilidades.obtenerTipoDocumento(usuarios[i].tipoIdentificacion);
                }
                const cantidad = await UtilidadesUsuarios.obtenerCantidadDeUsuarios(where);
                const infoUsuarios = {
                    usuarios: usuarios,
                    cantidad: cantidad
                }
                Utilidades.respuestaRetorno(true, sails.constantes.USUARIOS_ENCONTRADOS, res, infoUsuarios);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_USUARIOS, res);
        }
    },
    obtenerUsuarioPorId: async function (req, res) {
        let usuarioInfo = req.allParams();
        try {
            let usuario = await UtilidadesUsuarios.obtenerPorId(usuarioInfo.id);
            if (!usuario || usuario.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_USUARIO, res);
            } else {
                usuario[0].tipoIdentificacion = await Utilidades.obtenerTipoDocumento(usuario[0].tipoIdentificacion);
                Utilidades.respuestaRetorno(true, sails.constantes.USUARIO_ENCONTRADO, res, usuario);
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_USUARIO, res);
        }
    },
    login: async function (req, res) {
        let usuarioInfo = req.allParams();
        try {         
            let usuario = await UtilidadesUsuarios.obtenerPorIdentificacion(usuarioInfo.identificacion);
            if (!usuario || usuario.length === 0) {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_USUARIO, res);
            } else {              
                if (usuarioInfo.clave === usuario[0].clave) {
                    Utilidades.respuestaRetorno(true, sails.constantes.LOGIN_EXITOSO, res, usuario);
                } else {
                    Utilidades.respuestaRetorno(false, sails.constantes.DATOS_INCORRECTOS, res);
                }
            }
        } catch (error) {
            sails.log.debug(error);
            Utilidades.generarLogError(error);
            Utilidades.respuestaRetorno(false, sails.constantes.ERROR_HALLAR_USUARIO, res);
        }
    },
    crearUsuario: async function (req, res) {
        let usuarioInfo = req.allParams();
        let existeIdentificacion = await UtilidadesUsuarios.obtenerPorIdentificacion(usuarioInfo.identificacion);
        if (existeIdentificacion.length === 0) {
            let usuario = {
                primerNombre: usuarioInfo.primerNombre,
                segundoNombre: usuarioInfo.segundoNombre,
                primerApellido: usuarioInfo.primerApellido,
                segundoApellido: usuarioInfo.segundoApellido,
                identificacion: usuarioInfo.identificacion,
                clave: usuarioInfo.clave,
                correoElectronico: usuarioInfo.correoElectronico,
                celular: usuarioInfo.celular,
                estado: 1,
                tipoIdentificacion: usuarioInfo.tipoIdentificacion === 'C.C' ? 1 : 2,
                tipoUsuario: 2
            }
            await Usuario.create(usuario).then(() => {
                Utilidades.respuestaRetorno(true, sails.constantes.USUARIO_CREADO, res);
            }).catch((err) => {
                sails.log.debug(err);
                Utilidades.generarLogError(err);
                Utilidades.respuestaRetorno(false, sails.constantes.ERROR_CREAR_USUARIO, res);
            });
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.CORREO_IDENTIFICACION_YA_EXISTE, res);
        }
    },
    actualizarUsuario: async function (req, res) {
        let usuarioInfo = req.allParams();
        let usuarioExistente = await UtilidadesUsuarios.obtenerPorId(usuarioInfo.id);
        if (usuarioExistente.length > 0) {
            let usuario = {
                primerNombre: usuarioInfo.primerNombre,
                segundoNombre: usuarioInfo.segundoNombre,
                primerApellido: usuarioInfo.primerApellido,
                segundoApellido: usuarioInfo.segundoApellido,
                identificacion: usuarioInfo.identificacion,
                clave: usuarioInfo.clave,
                correoElectronico: usuarioInfo.correoElectronico,
                celular: usuarioInfo.celular,
                tipoIdentificacion: usuarioInfo.tipoIdentificacion === 'C.C' ? 1 : 2,
                tipoUsuario: usuarioInfo.tipoUsuario
            }
            await Usuario.update(usuarioExistente[0].id, usuario).then(() => {
                Utilidades.respuestaRetorno(true, sails.constantes.USUARIO_ACTUALIZADO, res);
            }).catch((err) => {
                sails.log.debug(err);
                Utilidades.generarLogError(err);
                Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ACTUALIZAR_USUARIO, res);
            });
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_USUARIO, res);
        }
    },
    eliminarUsuario: async function (req, res) {
        let usuarioInfo = req.allParams();
        if (usuarioInfo.idUsuario) {
            let usuarioExistente = await UtilidadesUsuarios.obtenerPorId(usuarioInfo.idUsuario);
            if (usuarioExistente.length > 0) {
                let usuario = {
                    estado: false
                }
                await Usuario.update(usuarioExistente[0].id, usuario).then(() => {
                    Utilidades.respuestaRetorno(true, sails.constantes.USUARIO_ELIMINADO, res);
                }).catch((err) => {
                    sails.log.debug(err);
                    Utilidades.generarLogError(err);
                    Utilidades.respuestaRetorno(false, sails.constantes.ERROR_ELIMINAR_USUARIO, res);
                });
            } else {
                Utilidades.respuestaRetorno(false, sails.constantes.NO_ENCONTRO_USUARIO, res);
            }
        } else {
            Utilidades.respuestaRetorno(false, sails.constantes.NO_ID_USUARIO, res);
        }
    }
};

