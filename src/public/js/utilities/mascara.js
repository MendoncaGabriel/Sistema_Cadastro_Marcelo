function mascara(src, mascara) {
    const campo = src.value.length;
    const texto = mascara.substring(campo);
    if (texto.charAt(0) !== '#') {
        src.value += texto.charAt(0);
        if (texto.charAt(1) === ' ') {
            src.value += ' ';
        };
    };
};