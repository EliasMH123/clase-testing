const CuentaBancaria = require( "./src/models/cuenta-bancaria.model")

const cuentaBancaria = new CuentaBancaria('19145678901', 50, '07/12/2022', '3')

console.log( cuentaBancaria.fechaCierre )
console.log( new Date() )
console.log( new Date().getTime() > cuentaBancaria.fechaCierre.getTime())
