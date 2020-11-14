
module.exports = {
    obtenerPorCorreoElectronico: async function (correoElectronico) {
        return await Usuario.find({ where: { correoElectronico: correoElectronico } });
    },
    obtenerPorIdentificacion: async function (identificacion) {
        return await Usuario.find({ where: { identificacion: identificacion } });
    },
    obtenerPorId: async function (id) {
        return await Usuario.find({ where: { id: id } });
    },
    obtenerCantidadDeUsuarios: async function (filtros) {
        return await Usuario.count({ where: filtros });
    },
    obtenerUsuariosPorNombre: async function(nombre){
        const arrayNombres = nombre.split(' ');
        let where = { or: [] };
        let idUsuarios = [];
        if (arrayNombres && arrayNombres.length > 0) {
            for (let i = 0; i < arrayNombres.length; i++) {
                where.or.push({primerNombre :{ 'contains': arrayNombres[i] }});
                where.or.push({segundoNombre :{ 'contains': arrayNombres[i] }});
                where.or.push({primerApellido :{ 'contains': arrayNombres[i] }});
                where.or.push({segundoApellido :{ 'contains': arrayNombres[i] }});
            }
            const usuarios = await Usuario.find({ where: where });
            if (usuarios && usuarios.length > 0) {
                for (let i = 0; i < usuarios.length; i++) {
                    idUsuarios.push(usuarios[i].id);
                }
            }
        }
        return idUsuarios;
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
        if (filtros.identificacion) {
            where.identificacion = { 'contains': filtros.identificacion }
        }
        if (filtros.nombre && filtros.nombre !== '') {
            const arrayNombres = filtros.nombre.split(' ');
            where.or = [];
            if (arrayNombres && arrayNombres.length > 0) {
                for (let i = 0; i < arrayNombres.length; i++) {
                    where.or.push({primerNombre :{ 'contains': arrayNombres[i] }});
                    where.or.push({segundoNombre :{ 'contains': arrayNombres[i] }});
                    where.or.push({primerApellido :{ 'contains': arrayNombres[i] }});
                    where.or.push({segundoApellido :{ 'contains': arrayNombres[i] }});
                }
            }
        }
        if (filtros.correoElectronico && filtros.correoElectronico !== '') {
            where.correoElectronico = { 'contains': filtros.correoElectronico };
        }
        if (filtros.telefono && filtros.telefono !== '' && filtros.telefono !== 0) {
            where.telefono = { 'contains': filtros.telefono };
        }
        if (filtros.celular && filtros.celular !== '' && filtros.celular !== 0) {
            where.celular = { 'contains': filtros.celular };
        }
        if (filtros.direccion && filtros.direccion !== '') {
            where.direccion = { 'contains': filtros.direccion };
        }
        if (filtros.estado === 'Activo') {
            where.estado = 1;
        } else if (filtros.estado === 'Inactivo') {
            where.estado = 0;
        }
        return where;
    }
};

