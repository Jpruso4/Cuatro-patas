
module.exports = {
  tableName: 'USUARIOS',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'idUsuario',
    },
    primerNombre: {
      type: 'string',
      columnName: 'primerNombre'
    },
    segundoNombre: {
      type: 'string',
      columnName: 'segundoNombre'
    },
    primerApellido: {
      type: 'string',
      columnName: 'primerApellido'
    },
    segundoApellido: {
      type: 'string',
      columnName: 'segundoApellido'
    },
    identificacion: {
      type: 'string',
      columnName: 'identificacion'
    },
    clave: {
      type: 'string',
      columnName: 'clave'
    },
    correoElectronico: {
      type: 'string',
      columnName: 'correoElectronico'
    },
    celular: {
      type: 'string',
      columnName: 'celular'
    },
    estado: {
      type: 'number',
      columnName: 'estado'
    },
    tipoIdentificacion: {
      type: 'number',
      columnName: 'tipoIdentificacion'
    },
    tipoUsuario: {
      type: 'number',
      columnName: 'tipoUsuario'
    }
  }
};

