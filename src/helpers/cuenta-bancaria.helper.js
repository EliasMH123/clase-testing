const { REGEX_NUM_CUENTA } = require('./constantes.helper')

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

const soloNumeros = numCuenta => REGEX_NUM_CUENTA.test( numCuenta )

module.exports = { parsearFecha, validarCuentaPlazoFijo, soloNumeros }