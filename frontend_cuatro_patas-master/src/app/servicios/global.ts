export var GLOBAL = {
    estados: {
        0: 'Inactivo',
        1: 'Activo'
    },
    mensajes: {
        identificacionUsuario: 'Identificación del usaurio incorrecta.'
    },
    rutas: {
        usuario: 'usuario',
        usuarios: 'usuarios',
        usuarios_eliminar: 'usuarios/eliminar',
        usuarios_obtenerlos: 'usuarios/obtenerlos',
        login: 'login',

        mascota: 'mascota',
        mascotas: 'mascotas',
        mascotas_eliminar: 'mascotas/eliminar',
        mascotas_obtenerlas: 'mascotas/obtenerlas',

        adopcion: 'adopcion',
        adopciones: 'adopciones',
        adopciones_eliminar: 'adopciones/eliminar',
        adopciones_obtenerlas: 'adopciones/obtenerlas',
    },
    titulosVistas: {
        crearUsuarios: 'Registrarse',
        editarUsuarios: 'Editar usuario',
        crearMascotas: 'Crear Mascota',
        editarMascotas: 'Editar Mascota',
        crearAdopciones: 'Crear Adoción',
        editarAdopciones: 'Editar Adopción'
    },
    urlBackend: 'http://localhost:1337/',
}