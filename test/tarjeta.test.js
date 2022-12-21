const CuentaBancaria = require( '../src/cuenta-bancaria.model')
const Tarjeta = require( '../src/tarjeta.model')

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