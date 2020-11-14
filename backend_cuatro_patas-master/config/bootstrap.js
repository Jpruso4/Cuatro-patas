/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  const fs = require('fs');

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.constantes = {
    ADOPCION_ACTUALIZADA: 'Adopción actualizada exitosamente.',
    ADOPCION_CREADA: 'Adopción creada exitosamente.',
    ADOPCION_ELIMINADA: 'Adopción eliminada exitosamente.',
    ADOPCION_ENCONTRADA: 'Adopción encontrada.',
    ADOPCIONES_ENCONTRADAS: 'Adopciones encontradas.',
    CORREO_IDENTIFICACION_YA_EXISTE: 'El número de identificación ya está registrado.',
    DATOS_INCORRECTOS: 'Identificación / Clave incorrecta.',
    ERROR_ACTUALIZAR_ADOPCION: 'Error al actualzar la adopción.',
    ERROR_ACTUALIZAR_MASCOTA: 'Error al actualzar la mascota.',
    ERROR_ACTUALIZAR_USUARIO: 'Error al actualzar el usuario.',
    ERROR_CREAR_ADOPCION: 'Error al crear la adopción.',
    ERROR_CREAR_MASCOTA: 'Error al crear la mascota.',
    ERROR_CREAR_USUARIO: 'Error al crear un usuario.',
    ERROR_ELIMINAR_ADOPCION: 'Error al eliminar la adopción.',
    ERROR_ELIMINAR_MASCOTA: 'Error al eliminar la mascota.',
    ERROR_ELIMINAR_USUARIO: 'Error al eliminar el usuario.',
    ERROR_HALLAR_ADOPCION: 'Error al hallar la adopción.',
    ERROR_HALLAR_ADOPCIONES: 'Error al hallar las adopciones.',
    ERROR_HALLAR_MASCOTA: 'Error al hallar la mascota.',
    ERROR_HALLAR_MASCOTAS: 'Error al hallar las mascotas.',
    ERROR_HALLAR_USUARIO: 'Error al hallar al usuario.',
    ERROR_HALLAR_USUARIOS: 'Error al hallar usuarios.',
    LOGIN_EXITOSO: 'Ha iniciado sesión.',
    MASCOTA_ACTUALIZADA: 'Mascota actualizada exitosamente.',
    MASCOTA_CREADA: 'Mascota creada exitosamente.',
    MASCOTA_ELIMINADA: 'Mascota eliminada exitosamente.',
    MASCOTA_ENCONTRADA: 'Mascota encontrada.',
    MASCOTAS_ENCONTRADAS: 'Mascotas encontradas.',
    NO_ENCONTRO_ADOPCION: 'No se encontraron adopción.',
    NO_ENCONTRO_ADOPCIONES: 'No se encontraron adopciones.',
    NO_ENCONTRO_MASCOTA: 'No se encontró la mascota.',
    NO_ENCONTRO_MASCOTAS: 'No se encontraron mascotas.',
    NO_ENCONTRO_TURNO: 'No se encontró el turno.',
    NO_ENCONTRO_USUARIO: 'No se encontró al usuario.',
    NO_ENCONTRO_USUARIO_IDENTIFICACION: 'No se encontró al usuario con esa identificación.',
    NO_ENCONTRO_USUARIOS: 'No se encontraron usuarios.',
    NO_ID_ADOPCION: 'No se obtuvo el Id de la adopción.',
    NO_ID_MASCOTA: 'No se obtuvo el Id de la mascota.',
    NO_ID_USUARIO: 'No se obtuvo el Id del usuario.',
    USUARIO_ACTUALIZADO: 'Usuario actualziado exitosamente.',
    USUARIO_CREADO: 'Usuario creado exitosamente.',
    USUARIO_ELIMINADO: 'Usuario eliminado exitosamente.',
    USUARIO_ENCONTRADO: 'Usuario encontrado.',
    USUARIOS_ENCONTRADOS: 'Usuarios encontrados.',
  };
  sails.estados = {
    INACTIVO: 0,
    ACTIVO: 1,
  };
  sails.fs = fs;
  sails.limitePaginacionUsuarios = 10;
  sails.limitePaginacionMascotas = 10;
  sails.limitePaginacionAdopciones = 10;
  return done();

};
