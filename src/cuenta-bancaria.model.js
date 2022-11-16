const {
    parsearFecha,
    validarCuentaPlazoFijo
}                 = require('./helpers/cuenta-bancaria.helper')
const Transaccion = require('./transaccion.model')

class CuentaBancaria {

    CUENTA_SUELDO       = '1'
    CUENTA_AHORRO       = '2'
    CUENTA_PLAZO_FIJO   = '3'
    MAX_CANTIDAD_CUENTA = 11
    
    constructor(numCuenta, saldoInicial, fechaCierre, tipo) {

        this.numCuenta     = this.validarNumCuenta( numCuenta )
        this.fechaCierre   = parsearFecha( fechaCierre )
        this.fechaCreacion = new Date()
        this.movimientos   = [ ]
        this.error         = ''
        this.tipo          = tipo
        this.saldo         = saldoInicial
    
    }

    verSaldo = () => {
        return Number( this.saldo.toFixed( 2 ) )
    }

    contarMov = () => {
        return this.movimientos.length
    }

    listarMovimiento = () => {
        this.movimientos.forEach( movimiento => {
            const result = movimiento.listarDetalle()
            console.log(result)
        })
    }

    registrarRetiro = (detalle, monto) => {

        try {
            
            if (this.tipo === this.CUENTA_AHORRO) {
                return false
            }

            if (this.tipo === this.CUENTA_PLAZO_FIJO) {

                const isPlazoFijo = validarCuentaPlazoFijo( this.fechaCierre )
                
                if (!isPlazoFijo) {
                    return false
                }
            
            }          

            if (this.saldo < Number( monto )) {
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

                const isPlazoFijo = validarCuentaPlazoFijo( this.fechaCierre )
                
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

}

module.exports = CuentaBancaria