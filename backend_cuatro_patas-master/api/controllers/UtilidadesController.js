/**
 * UtilidadesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    respuestaRetorno: function (estado, mensaje, res, data) {
        if (data) {
            return res.send({
                'estado': estado,
                'mensaje': mensaje,
                'data': data
            });
        } else {
            return res.send({
                'estado': estado,
                'mensaje': mensaje
            });
        }
    },
    obtenerEstado: function (estado) {
        if (estado === 0) {
            return 'Inactivo';
        } else if (estado === 1) {
            return 'Activo';
        }
    },
    obtenerTipoDocumento: function (tipoDocumento) {
        if (tipoDocumento === 1) {
            return 'C.C';
        } else if (tipoDocumento === 2) {
            return 'T.I';
        }
    },
    generarLogError(error) {
        var dir = './logs';
        if (!sails.fs.existsSync(dir)) {
            sails.fs.mkdirSync(dir);
        }
        let nombre = new Date().getTime();
        sails.fs.writeFile("./logs/log_" + nombre + ".txt", error, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    }
};

