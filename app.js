const CuentaBancaria = require('./src/cuenta-bancaria.model')

const cuentaBancaria = new CuentaBancaria('2345678', 50, undefined, '3')

const result = cuentaBancaria.verNumCuenta()

console.log({ result });