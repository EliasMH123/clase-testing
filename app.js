const CuentaBancaria = require('./src/cuenta-bancaria.model')

const cuentaBancaria = new CuentaBancaria(undefined, 50, undefined, '1')

console.log( cuentaBancaria.verNumCuenta() );