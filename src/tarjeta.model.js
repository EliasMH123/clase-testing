const { soloNumeros } = require('./helpers/cuenta-bancaria.helper')

class Tarjeta {
    
    constructor(cliente, dni, numTarjeta, contrasenia, cuentasBancarias = []) {
        this.cliente          = cliente
        this.dni              = dni
        this.numTarjeta       = numTarjeta
        this.contrasenia      = contrasenia
        this.cuentasBancarias = cuentasBancarias
    }

    verCuentasBancarias      = () => this.cuentasBancarias
    cantidadCuentasBancarias = () => this.cuentasBancarias.length
    
    iniciarSesion = (tarjeta, passw) => {

        if ( this.numTarjeta !== tarjeta && this.contrasenia !== passw ) {
            return false
        }

        return true

    }

    seleccionarNumCuenta = (numCuenta) => {
        return this
                .cuentasBancarias
                .find( cuenta => cuenta.numCuenta === numCuenta)
    }

    validarNumTarjeta = (numTarjeta) => {

        if (!soloNumeros(numTarjeta)) {
            throw new Error('Tu numero de tarjeta solo debe ser numerico')
        }

        return numTarjeta

    }

    validarCuentasBancarias = (cuentasBancarias) => {
        if (cuentasBancarias.length === 0) {
            throw new Error('No puedes tener una tarjeta sin cuentas bancarias')
        }

        return true
    }

}

model.exports = Tarjeta