const {
    parsearFecha,
    validarCuentaPlazoFijo
}                 = require('./helpers/cuenta-bancaria.helper')
const Transaccion = require('./transaccion.model')

class CuentaBancaria {

    CUENTA_SUELDO        = '1'
    CUENTA_AHORRO        = '2'
    CUENTA_PLAZO_FIJO    = '3'
    MAX_CANTIDAD_CUENTA  = 11
    TRANSACCION_RETIRO   = 'S'
    TRANSACCION_DEPOSITO = 'D'
    
    constructor(numCuenta = '1', saldoInicial, fechaCierre, tipo) {

        this.numCuenta     = this.validarNumCuenta( numCuenta )
        this.fechaCierre   = parsearFecha( fechaCierre )
        this.fechaCreacion = new Date()
        this.movimientos   = [ ]
        this.error         = ''
        this.tipo          = tipo
        this.saldo         = saldoInicial
    
    }

    verSaldo     = () => Number( this.saldo.toFixed( 2 ) )

    contarMov    = () => this.movimientos.length
    
    verNumCuenta = () => this.numCuenta

    listarMovimiento = () => {
        this.movimientos.forEach( movimiento => {
            const result = movimiento.listarDetalle()
            console.log(result)
        })
    }

    registrarRetiro = (detalle, monto) => {

        try {
            
            if (this.tipo === this.CUENTA_AHORRO) {
                this.error = 'Una cuenta de ahorro no puede retirar dinero!'
                return false
            }

            if (this.tipo === this.CUENTA_PLAZO_FIJO) {

                const isPlazoFijo = validarCuentaPlazoFijo( this.fechaCierre )
                
                if (!isPlazoFijo) {
                    this.error = `Aún no puede retirar dinero hasta que pase la fecha sgte: ${ this.fechaCierre }`
                    return false
                }
            
            }          

            if (this.saldo < Number( monto )) {
                this.error = 'El saldo que desea retirar es inferiro al que sea retirar!'
                return false
            }

            const transaccion   = new Transaccion()

            transaccion.detalle = detalle
            transaccion.monto   = Number( monto )
            transaccion.tipo    = this.TRANSACCION_RETIRO

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
                    this.error = `Aún no puede depositar dinero hasta que pase la fecha sgte: ${ this.fechaCierre }`
                    return false
                }
            
            }
            
            const transaccion = new Transaccion()

            transaccion.detalle = detalle
            transaccion.monto   = Number( monto )
            transaccion.tipo    = this.TRANSACCION_DEPOSITO

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

    validarCreacionTipoCuenta = tipo => {

        const tiposCuenta = [ 1, 2, 3 ]

        if ( !tiposCuenta.includes( tipo ) ) {
            this.error = 'No existe este tipo de cuenta, no se puede crear'
            throw 'Error al crear tipo de cuenta'
        }
        
    }

}

module.exports = CuentaBancaria