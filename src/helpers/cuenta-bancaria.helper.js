const parsearFecha = fechaCierre => {
    const pars = new Date( fechaCierre )
    return new Date( pars )
}

const validarCuentaPlazoFijo = fechaCierre => {
    
    const fechaActual = new Date()

    if (fechaCierre.getTime() >= fechaActual.getTime() ) {
        return false
    }

    return true

}

module.exports = { parsearFecha, validarCuentaPlazoFijo }