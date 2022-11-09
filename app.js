const CuentaBancaria = require( "./src/models/cuenta-bancaria.model")

const cuentaBancaria = new CuentaBancaria('1', 100, null, '1')

console.log( cuentaBancaria.tipo )
console.log( cuentaBancaria.saldo )

cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 250.20)

console.log( cuentaBancaria.saldo)