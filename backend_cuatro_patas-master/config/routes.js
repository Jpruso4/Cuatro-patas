
module.exports.routes = {
  '/': {
    view: 'pages/homepage'
  },

  /**
   * Rutas para los usuarios
   */
  'GET /usuarios/:id': 'UsuariosController.obtenerUsuarioPorId',
  'POST /usuarios/obtenerlos': 'UsuariosController.obtenerUsuarios',
  'POST /login': 'UsuariosController.login',
  'POST /usuarios': 'UsuariosController.crearUsuario',
  'PUT /usuarios': 'UsuariosController.actualizarUsuario',
  'PUT /usuarios/eliminar': 'UsuariosController.eliminarUsuario',

  /**
   * Rutas para las adopciones
   */
  'GET /adopciones/:id': 'AdopcionesController.obtenerAdopcionPorId',
  'POST /adopciones/obtenerlas': 'AdopcionesController.obtenerAdopciones',
  'POST /adopciones': 'AdopcionesController.crearAdopcion',
  'PUT /adopciones': 'AdopcionesController.actualizarAdopcion',
  'PUT /adopciones/eliminar': 'AdopcionesController.eliminarAdopcion',

  /**
   * Rutas para las mascotas
   */
  'GET /mascotas/:id': 'MascotasController.obtenerMascotaPorId',
  'GET /mascotas': 'MascotasController.obtenerMascotas',
  'POST /mascotas/obtenerlas': 'MascotasController.obtenerMascotasFiltrado',
  'POST /mascotas': 'MascotasController.crearMascota',
  'PUT /mascotas': 'MascotasController.actualizarMascota',
  'PUT /mascotas/eliminar': 'MascotasController.eliminarMascota'
  
};
