const CuentaBancaria = require( '../src/cuenta-bancaria.model')
const Tarjeta = require( '../src/tarjeta.model')

const { cuentas } = require('../src/db/cuentas-bancarias.db')

describe('Inicio de sesión', () => {


    const cuenta1 = new CuentaBancaria('111178901', 50, null, '1')
    const cuenta2 = new CuentaBancaria('222278901', 50, null, '1')

    const tarjeta = new Tarjeta('Kevin Peinado', '99545678909', '8523', [ cuenta1, cuenta2 ])

    test('1. correcto', () => { 

        expect(
            tarjeta.iniciarSesion('99545678909', '8523')
        ).toBe(true)

    })
    test('2. Incorrecto', () => { 

        expect(
            tarjeta.iniciarSesion('99545678909', '1523')
        ).toBe(false)

    })
})

describe('Configuraciónes de la cuenta', () => {

    const cuenta1 = new CuentaBancaria('111178901', 50, null, '1')
    const cuenta2 = new CuentaBancaria('222278901', 50, null, '1')

    const tarjeta = new Tarjeta('Kevin Peinado', '99545678909', '8523', [ cuenta1, cuenta2 ])

    test('3. Mostrar cuentas bancarias enlazadas', () => {
        expect(
            tarjeta.verCuentasBancarias()
        ).toBe(tarjeta.cuentasBancarias)
    })

    test('4. Mostrar cantidad de cuentas bancarias', () => {
        expect(
            tarjeta.cantidadCuentasBancarias()
        ).toBe( 2 )
    })

    test('8. Creación de tarjeta incorrecta letras en el numero de tarjeta!', () => {
        expect(() => {
            const tarjetaPrueba  = new Tarjeta('Kevin Peinado', 'aa3456ee912', '8523', [ cuenta1 ])
        }).toThrowError('Tu numero de tarjeta solo debe ser numerico')
    })

    test('9. Error al crear el numero de tarjeta, sin cuentas bancarias', () => {
        expect(() => {
            const tarjetaPrueba  = new Tarjeta('Kevin Peinado', '99545678909', '8523', [  ])
        }).toThrowError('No puedes tener una tarjeta sin cuentas bancarias')
    })
    
})

describe('Transferencias a cuentas bancarias', () => {
    
    const cuenta1 = new CuentaBancaria('74125896325', 650, null, '1')
    const cuenta2 = new CuentaBancaria('222278901', 50, null, '1')
    
    const tarjeta = new Tarjeta('Kevin Peinado', '99545678909', '8523', [ cuenta1, cuenta2 ])

    let cuentaSeleccionada = null

    test('5. Seleccionar cuenta bancaria.', () => {
        
        cuentaSeleccionada = tarjeta.seleccionarNumCuenta('74125896325')

        expect( cuentaSeleccionada ).toBe( cuenta1 )

    })

    test('6. Transferencias exitosa.', () => {
        
        expect( cuenta1.transferencia('Toma pa tu panetón', 100, '11145678911') ).toBe( true )

        const cuentaDestino = cuentas
                                .find( cuenta => cuenta.numCuenta === '11145678911')

        expect( cuentaDestino.saldo ).toBe( 110 )

        expect( cuenta1.verSaldo() ).toBe( 550 )

    })

    test('7. Transferencias inexistencia.', () => {
        
        expect( cuenta1.transferencia('Enviando pa lo niños!', 20, '2522222222') ).toBe( false )

    })
})