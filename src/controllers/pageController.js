const registradorModel = require('../models/registradorModel');

module.exports = {
    login: (req, res) => {
        res.render('login')
    },
    home: (req, res) => {
        res.render('home')
    },
    cadastroRegistrador: async (req, res) => {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const registradoresByOffset = await  registradorModel.getRegistradoresByOffset(offset, limit);

        const status = req.query.status || null;
        const msg = req.query.msg || null;

        const data = {
            registradores: registradoresByOffset || [],
            status: status,
            msg: msg
        };

        res.render('cadastroRegistrador', data)
    }
}