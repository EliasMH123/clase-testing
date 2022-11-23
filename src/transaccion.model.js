class Transaccion {

    constructor() { this.fecha = new Date() }

    listarDetalle = ( transaccion ) => {
        return `
            Fecha:   ${transaccion.fecha},
            Detalle: ${transaccion.detalle},
            Tipo:    ${transaccion.tipo}
            Monto:   ${transaccion.monto}
        `
    }

    build({ detalle, tipo, monto }) {
        this.detalle = detalle
        this.tipo    = tipo
        this.monto   = monto
    }

}

module.exports = Transaccion