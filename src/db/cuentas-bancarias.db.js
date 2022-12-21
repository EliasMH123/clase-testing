const CuentaBancaria = require( '../../src/cuenta-bancaria.model')

const cuentaBancaria1 = new CuentaBancaria('11145678911', 10, null, '1')
const cuentaBancaria2 = new CuentaBancaria('22145678922', 20, null, '1')
const cuentaBancaria3 = new CuentaBancaria('33145678933', 30, null, '1')
const cuentaBancaria4 = new CuentaBancaria('44145678944', 40, null, '1')
const cuentaBancaria5 = new CuentaBancaria('55145678955', 50, null, '1')

const cuentas = [
    cuentaBancaria1,
    cuentaBancaria2,
    cuentaBancaria3,
    cuentaBancaria4,
    cuentaBancaria5
]

module.exports = { cuentas }