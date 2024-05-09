const express = require('express');
const router = express.Router();
const path = require('path')

// Servir arquivos estáticos do diretório 'build' do React

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = router;
