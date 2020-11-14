
module.exports = {
  tableName: 'MASCOTAS',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'idMascota',
    },
    nombre: {
      type: 'string',
      columnName: 'nombre'
    },
    raza: {
      type: 'string',
      columnName: 'raza'
    },
    edad: {
      type: 'string',
      columnName: 'edad'
    },
    genero: {
      type: 'string',
      columnName: 'genero'
    },
    tamanio: {
      type: 'string',
      columnName: 'tamanio'
    },
    personalidad: {
      type: 'string',
      columnName: 'personalidad'
    },
    color: {
      type: 'string',
      columnName: 'color'
    },
    urlImagen: {
      type: 'string',
      columnName: 'urlImagen'
    },
    estado: {
      type: 'number',
      columnName: 'estado'
    }
  }
};

