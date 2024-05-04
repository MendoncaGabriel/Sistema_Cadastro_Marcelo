const routerController = require('../../models/router');

module.exports = {
    home: (req, res) => {
        if(routerController.exemplo()){
            
            res.render('home', { title: 'Express'});
        };
    }
};