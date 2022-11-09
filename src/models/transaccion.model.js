class Transaccion {

    constructor(detalle, tipo, monto) {

        this.fecha   = new Date()
        this.detalle = detalle
        this.tipo    = tipo
        this.monto   = monto
        
    }

    listarDetalle = ( transaccion ) => {
        return `
            Fecha:   ${transaccion.fecha},
            Detalle: ${transaccion.detalle},
            Tipo:    ${transaccion.tipo}
            Monto:   ${transaccion.monto}
        `
    }
}

module.exports = Transaccion