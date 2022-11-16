const CuentaBancaria = require( '../src/cuenta-bancaria.model')

describe('A. Pruebas de retiro: ', () => {

    let cuentaBancaria = null

    test('1. Retiro de monto tipo cuenta sueldo', () => {
    
        cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '1')
    
        expect(
            cuentaBancaria.registrarRetiro('Quiero retirar para mi chifon!', 100)
        ).toBe( false )
    
    })
    
    test('2. Retiro de monto tipo cuenta ahorro', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, null, '2')
    
        expect(
            cuentaBancaria.registrarRetiro('Prueba de retiro para la upeu.', 20)
        ).toBe( false )
    
    })

    test('4. Retiro de dinero para tipo de cuenta plazo fijo', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, '2022/12/09', '3')
    
        expect(
            cuentaBancaria.registrarRetiro('Retirar para fortalezón!', 20)
        ).toBe( false )
    
    })

})

describe('B. Pruebas de atributos: ', () => {

    let cuentaBancaria = null

    test('3. Cuando el numero de cuenta es menor a 11 digitos', () => {

        cuentaBancaria = new CuentaBancaria('19145678', 50, null, '2')
        
        expect(
            cuentaBancaria.verNumCuenta()
        ).toBe( '19145678000' )
    
    })
    
    test('7. Recortar en caso de exceder a 11 digitos', () => {

        cuentaBancaria = new CuentaBancaria('1914567890145', 90, null, '2')
    
        expect(
            cuentaBancaria.verNumCuenta()
        ).toBe( '19145678901' )
    
    })

    test('9. Validacion de atributos', () => {

        cuentaBancaria = new CuentaBancaria('KA3333333', 90, null, '2')

        expect(
            cuentaBancaria.error
        ).toBe('Error al crear tipo de cuenta')
    })

})

describe('C. Pruebas de despositos: ', () => {

    let cuentaBancaria = null

    test('5. Deposito de cuenta a plazo fijo que si cumple', () => {

        cuentaBancaria = new CuentaBancaria('19145678901', 50, '2022/11/08', '3')
    
        expect(
            cuentaBancaria.registrarDeposito('Depósito para sacar ganancias y poder salir de Latam.', 40)
        ).toBe( true )
    
    })
    
    test('6. Deposito de cuenta a de ahorro', () => {
    
        cuentaBancaria = new CuentaBancaria('19145678901', 90, null, '2')
    
        expect(
            cuentaBancaria.registrarDeposito('Descripción de pruebas!', 20)
        ).toBe( true )
        
        expect(
            cuentaBancaria.verSaldo()
        ).toBe( 110 )
    
    })
})

describe('( 8 ): Flujo completo', () => {

    const cuentaBancaria = new CuentaBancaria('19145678901', 50, '2022/10/08', '3')
    
    test('- Validar deposito correcto', () => {        
        expect(
            cuentaBancaria.registrarDeposito('Haciendo el deposito de parte de la suggar', 19000.60)
        ).toBe( true )
    })

    test('- Validar retiro correcto', () => {        
        expect(
            cuentaBancaria.registrarRetiro('Retirando para pagar una macbook', 15000.10)
        ).toBe( true )
    })

    test('- Ver saldo despues de transacciones', () => {
        expect(
            cuentaBancaria.verSaldo()
        ).toBe( 4050.50 )
    })

    test('- Cantidad de movimientos', () => {
        expect(
            cuentaBancaria.contarMov()
        ).toBe( 2 )
    })

})