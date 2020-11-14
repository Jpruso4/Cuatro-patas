
module.exports = {
    obtenerPorId: async function (id) {
        return await Mascota.find({ where: { id: id } });
    },
    obtenerCantidadDeMascotas: async function (filtros) {
        return await Mascota.count({ where: filtros });
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
        if (filtros.nombre && filtros.nombre !== '') {
            where.nombre = { 'contains': filtros.nombre }
        }
        if (filtros.raza && filtros.raza !== '') {
            where.raza = { 'contains': filtros.raza }
        }
        if (filtros.edad && filtros.edad !== '') {
            where.edad = { 'contains': filtros.edad };
        }
        if (filtros.genero && filtros.genero !== '') {
            where.genero = { 'contains': filtros.genero };
        }
        if (filtros.tamanio && filtros.tamanio !== '') {
            where.tamanio = { 'contains': filtros.tamanio };
        }
        if (filtros.personalidad && filtros.personalidad !== '') {
            where.personalidad = { 'contains': filtros.personalidad };
        }
        if (filtros.color && filtros.color !== '') {
            where.color = { 'contains': filtros.color };
        }
        if (filtros.estado === 'Activo') {
            where.estado = 1;
        } else if (filtros.estado === 'Inactivo') {
            where.estado = 0;
        }        
        return where;
    }
};

