const CuentaBancaria = require( '../src/cuenta-bancaria.model')

describe('A. Pruebas de retiro: ', () => {

    let cuentaBancaria = null

    test('1. Retiro de monto tipo cuenta sueldo', () => {
    
        cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '1')
    
        expect(
            cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 100)
        ).toBe( false )
    
    })
    
    test('2. Retiro de monto tipo cuenta ahorro', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '2')
    
        expect(
            cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 20)
        ).toBe( false )
    
    })

    test('4. Retiro de dinero para tipo de cuenta plazo fijo', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, '2022/12/09', '3')
    
        expect(
            cuentaBancaria.registrarRetiro('Depositar lo que sea para mi ama pe', 20)
        ).toBe( false )
    
    })

})

describe('B. Pruebas de atributos: ', () => {

    let cuentaBancaria = null

    test('3. Cuando el numero de cuenta es menor a 11 digitos', () => {

        cuentaBancaria = new CuentaBancaria('19145678', 50, null, '2')
        
        expect(
            cuentaBancaria.numCuenta
        ).toBe( '19145678000' )
    
    })
    
    test('7. Recortar en caso de exceder a 11 digitos', () => {

        cuentaBancaria = new CuentaBancaria('1914567890145', 90, null, '2')
    
        expect(
            cuentaBancaria.numCuenta
        ).toBe( '19145678901' )
    
    })

})

describe('C. Pruebas de despositos: ', () => {

    let cuentaBancaria = null

    test('5. Deposito de cuenta a plazo fijo que si cumple', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, '2022/11/08', '3')
    
        expect(
            cuentaBancaria.registrarDeposito('Depositar lo que sea para mi ama pe', 40)
        ).toBe( true )
    
    })
    
    test('6. Deposito de cuenta a de ahorro', () => {
    
        cuentaBancaria = new CuentaBancaria('19145678901', 90, null, '2')
    
        cuentaBancaria.registrarDeposito('Depositar lo que sea para mi ama pe', 20)
        
        expect(
            cuentaBancaria.saldo
        ).toBe( 110 )
    
    })
})





