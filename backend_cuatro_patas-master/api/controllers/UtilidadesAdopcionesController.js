
module.exports = {
    obtenerPorId: async function (id) {
        return await Adopcion.find({ where: { id: id } });
    },
    obtenerCantidadDeAdopciones: async function (filtros) {
        return await Adopcion.count({ where: filtros });
    },
    obtenerFiltros: async function (filtros) {
        let where = {};
        let desde, hasta;
        if (filtros.desde && filtros.hasta) {
            const fDesde = filtros.desde.year + '/' + filtros.desde.month + '/' + filtros.desde.day;
            desde = new Date(fDesde).getTime();
            const fHasta = filtros.hasta.year + '/' + filtros.hasta.month + '/' + filtros.hasta.day;
            hasta = new Date(fHasta).getTime();
            where.createdAt = { '>=': desde, '<=': hasta };
        } else if (filtros.desde) {
            const fDesde = filtros.desde.year + '/' + filtros.desde.month + '/' + filtros.desde.day;
            desde = new Date(fDesde).getTime();
            where.createdAt = { '>=': desde };
        } else if (filtros.hasta) {
            const fHasta = filtros.hasta.year + '/' + filtros.hasta.month + '/' + filtros.hasta.day;
            hasta = new Date(fHasta).getTime();
            where.createdAt = { '<=': hasta };
        }
        if (filtros.direccion && filtros.direccion !== '') {
            where.direccion = { 'contains': filtros.direccion }
        }
        if (filtros.ciudad && filtros.ciudad !== '') {
            where.ciudad = { 'contains': filtros.ciudad }
        }
        if (filtros.barrio && filtros.barrio !== '') {
            where.barrio = { 'contains': filtros.barrio };
        }
        if (filtros.estrato && filtros.estrato !== '') {
            where.estrato = { 'contains': filtros.estrato };
        }
        if (filtros.estado === 'Activo') {
            where.estado = 1;
        } else if (filtros.estado === 'Inactivo') {
            where.estado = 0;
        }
        if (filtros.adoptante && filtros.adoptante !== '') {
            where.nombreUsuario = { 'contains': filtros.adoptante };
        }
        if (filtros.mascota && filtros.mascota !== '') {
            where.nombreMascota = { 'contains': filtros.mascota };
        }
        if (filtros.idUsuario && filtros.idUsuario !== '') {
            where.idUsuario = filtros.idUsuario;
        }
        return where;
    }
};

