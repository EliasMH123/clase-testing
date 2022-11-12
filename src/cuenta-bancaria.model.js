const Transaccion = require('./transaccion.model')

class CuentaBancaria {

    CUENTA_SUELDO       = '1'
    CUENTA_AHORRO       = '2'
    CUENTA_PLAZO_FIJO   = '3'
    MAX_CANTIDAD_CUENTA = 11
    
    constructor(numCuenta, saldoInicial, fechaCierre, tipo) {

        this.numCuenta     = this.validarNumCuenta( numCuenta )
        this.fechaCierre   = this.parsearFecha( fechaCierre )
        this.fechaCreacion = new Date()
        this.movimientos   = [ ]
        this.error         = ''
        this.tipo          = tipo
        this.saldo         = saldoInicial
    
    }

    parsearFecha = fechaCierre => {
        const pars = new Date( fechaCierre )
        return new Date( pars )
    }

    validarNumCuenta = numCuenta => {

        if (numCuenta.length > this.MAX_CANTIDAD_CUENTA) {
            return numCuenta.substring(0, this.MAX_CANTIDAD_CUENTA)
        }
        
        if (numCuenta.length < this.MAX_CANTIDAD_CUENTA) {
            
            const cantidad = this.MAX_CANTIDAD_CUENTA - numCuenta.length

            for(let i = 0; i < cantidad; i++) {
                numCuenta += '0'
            }

            return numCuenta

        }

        return numCuenta

    }

    versSaldo = () => {
        console.log(`Usted tiene un saldo de ${this.saldo} soles.`)
        return this.saldo
    }

    contarMov = () => {
        return this.movimientos.length
    }

    listarMovimiento = () => {
        console.log(`Mostrando movimientos...`)
        movimientos.forEach( movimiento => {
            const result = movimiento.listarDetalle()
            console.log( result )
        })
    }

    registrarRetiro = (detalle, monto) => {

        try {
            
            if (this.tipo === this.CUENTA_AHORRO) {
                return false
            }

            if (this.tipo === this.CUENTA_PLAZO_FIJO) {

                const isPlazoFijo = this.validarCuentaPlazoFijo( this.fechaCierre )
                
                if (!isPlazoFijo) {
                    return false
                }
            
            }          

            if (this.saldo < Number( monto )) {
                console.log(`No puede retirar la sgte cantidad: ${ monto }, ya que usted tiene un saldo de ${ this.saldo }...`)
                return false
            }

            const transaccion   = new Transaccion()

            transaccion.detalle = detalle
            transaccion.monto   = Number( monto )
            transaccion.tipo    = 'S'

            this.movimientos.push( transaccion )

            this.saldo -= monto.toFixed(2)

        } catch( error ) {
            console.log('Oops, ocurrio un error al hacer la transaccion...')
            this.error = error
            return false
        }

        return true

    }

    registrarDeposito = (detalle, monto) => {

        try {
            
            if (this.tipo === this.CUENTA_PLAZO_FIJO) {

                const isPlazoFijo = this.validarCuentaPlazoFijo( this.fechaCierre )
                
                if (!isPlazoFijo) {
                    return false
                }
            
            }
            
            const transaccion = new Transaccion()

            transaccion.detalle = detalle
            transaccion.monto   = Number( monto )
            transaccion.tipo    = 'E'

            this.movimientos.push( transaccion )

            this.saldo += monto

        } catch( error ) {
            console.log('Oops, ocurrio un error al hacer la transaccion...')
            this.error = error
            return false
        }

        return true

    }

    validarCuentaPlazoFijo = fechaCierre => {
    
        const fechaActual = new Date()

        if (fechaCierre.getTime() >= fechaActual.getTime() ) {
            return false
        }

        return true

    }

}

module.exports = CuentaBancaria