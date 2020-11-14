
module.exports = {
  tableName: 'ADOPCIONES',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'idAdopcion',
    },
    direccion: {
      type: 'string',
      columnName: 'direccion'
    },
    ciudad: {
      type: 'string',
      columnName: 'ciudad'
    },
    barrio: {
      type: 'string',
      columnName: 'barrio'
    },
    estrato: {
      type: 'string',
      columnName: 'estrato'
    },
    primeraVezAdopta: {
      type: 'number',
      columnName: 'primeraVezAdopta'
    },
    cantidadMascotas: {
      type: 'string',
      columnName: 'cantidadMascotas'
    },
    recursosEconomicos: {
      type: 'number',
      columnName: 'recursosEconomicos'
    },
    hogarSeguro: {
      type: 'number',
      columnName: 'hogarSeguro'
    },
    todosSeguros: {
      type: 'number',
      columnName: 'todosSeguros'
    },
    porqueAdoptar: {
      type: 'string',
      columnName: 'porqueAdoptar'
    },
    idUsuario: {
      type: 'number',
      columnName: 'idUsuario'
    },
    nombreUsuario: {
      type: 'string',
      columnName: 'nombreUsuario'
    },
    idMascota: {
      type: 'number',
      columnName: 'idMascota'
    },
    nombreMascota: {
      type: 'string',
      columnName: 'nombreMascota'
    },
    estado: {
      type: 'number',
      columnName: 'estado'
    }
  }
};

