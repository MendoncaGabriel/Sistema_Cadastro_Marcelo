const authModel = require('../models/authModel');

module.exports = {
    login: async (req, res) => {
        try {
            const {login, password} = req.body;
            const token = await authModel.login(login, password);

            //APLICANDO TOKEN EM COOKIES
            const dias = 1000 * 60 * 60 * 24 * 30;
            res.cookie('token', token, {
                maxAge:  dias, 
                httpOnly: true // O cookie só será acessível pelo servidor
            });
            
            res.redirect('/')
        } catch (error) {
            res.status(401).json({msg: error.message})
        }
    },
    logout: async (req, res) => {
        res.cookie('token', null, { 
            maxAge: 0, // Tempo de vida zero para excluir imediatamente
            httpOnly: true // O cookie só será acessível pelo servidor
        });
        res.redirect('/login');
    }
}