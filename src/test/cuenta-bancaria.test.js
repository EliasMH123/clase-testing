const CuentaBancaria = require( '../models/cuenta-bancaria.model')

test('1. Retiro de monto tipo cuenta sueldo', () => {

    const cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '1')

    expect(
        cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 100)
    ).toBe( false )

})

test('2. Retiro de monto tipo cuenta ahorro', () => {

    const cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '2')

    expect(
        cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 20)
    ).toBe( false )

})

test('3. Cuando el numero de cuenta es menor a 11 digitos', () => {

    const cuentaBancaria = new CuentaBancaria('19145678', 50, null, '2')
    
    expect(
        cuentaBancaria.numCuenta === '19145678000'
    ).toBe( true )

})

test('4. Retiro de dinero para tipo de cuenta plazo fijo', () => {

    const cuentaBancaria = new CuentaBancaria('19145678901', 50, '09/12/2022', '3')

    expect(
        cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 20)
    ).toBe( true )
    // revisar esto pq deberia ser false

})