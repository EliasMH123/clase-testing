const Transaccion = require('./transaccion.model')
const {
    CUENTA_AHORRO,
    CUENTA_PLAZO_FIJO,
    MAX_CANTIDAD_CUENTA,
    TRANSACCION_RETIRO,
    TRANSACCION_DEPOSITO,
    TIPO_CUENTAS
}                 = require('./helpers/constantes.helper')
const {
    parsearFecha,
    validarCuentaPlazoFijo,
    soloNumeros
}                 = require('./helpers/cuenta-bancaria.helper')

class CuentaBancaria {
    
    constructor(
        numCuenta    = '1', 
        saldoInicial = 0.0,
        fechaCierre,
        tipo
    ) {

        this.numCuenta     = this.validarNumCuenta( numCuenta )
        this.fechaCierre   = parsearFecha( fechaCierre )
        this.tipo          = this.validarCreacionTipoCuenta( tipo )
        this.fechaCreacion = new Date()
        this.movimientos   = [ ]
        this.error         = ''
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
            
            if (this.tipo === CUENTA_AHORRO) {
                this.error = 'Una cuenta de ahorro no puede retirar dinero!'
                return false
            }

            if (this.tipo === CUENTA_PLAZO_FIJO) {

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

            const transaccion  = new Transaccion()

            transaccion.build({ 
                detalle, 
                tipo: TRANSACCION_RETIRO, 
                monto: Number(monto)
            })

            this.movimientos.push( transaccion )

            this.saldo -= monto.toFixed(2)

        } catch( error ) {
            this.error = error
            return false
        }

        return true

    }

    registrarDeposito = (detalle, monto) => {

        try {
            
            if (this.tipo === CUENTA_PLAZO_FIJO) {

                const isPlazoFijo = validarCuentaPlazoFijo( this.fechaCierre )
                
                if (!isPlazoFijo) {
                    this.error = `Aún no puede depositar dinero hasta que pase la fecha sgte: ${ this.fechaCierre }`
                    return false
                }
            
            }
            
            const transaccion = new Transaccion()

            transaccion.build({ 
                detalle, 
                tipo: TRANSACCION_DEPOSITO, 
                monto: Number(monto)
            })

            this.movimientos.push( transaccion )

            this.saldo += monto

        } catch( error ) {
            this.error = error
            return false
        }

        return true

    }

    validarNumCuenta = numCuenta => {

        if ( !soloNumeros( numCuenta ) ) {
            this.error = 'No puedes crear cuenta bancaria con caracteres alfabeticos.'
            throw new Error('No puedes crear cuenta bancaria con caracteres alfabeticos.')
        }

        if (numCuenta.length > MAX_CANTIDAD_CUENTA) {
            return numCuenta.substring(0, MAX_CANTIDAD_CUENTA)
        }
        
        if (numCuenta.length < MAX_CANTIDAD_CUENTA) {
            
            const cantidad = MAX_CANTIDAD_CUENTA - numCuenta.length

            for(let i = 0; i < cantidad; i++) {
                numCuenta += '0'
            }

            return numCuenta

        }

        return numCuenta

    }

    validarCreacionTipoCuenta = tipo => {

        if ( !TIPO_CUENTAS.includes( tipo ) ) {
            this.error = 'Error al crear tipo de cuenta.'
            throw new Error('Error al crear tipo de cuenta.')
        }

        return tipo
        
    }

    transferencia = (detalle, monto, destinatario) => {
        
    }

}

module.exports = CuentaBancaria