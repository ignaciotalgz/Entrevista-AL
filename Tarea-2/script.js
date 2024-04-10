/*
	En Javascript desarrollar funciones para manipular el siguiente array
	1. Filtrar por nroCuenta
	2. Filtrar por titularCuenta
	4. Filtrar por tipoCuenta
	3. Realizar un débito en una cuenta especificada
*/
const arrayCuentas = [
  {
    nroCuenta: 5486273622,
    tipoDeCuenta: "Cuenta Corriente",
    saldoEnPesos: 27771,
    titularCuenta: "Abigael Natte",
  },
  {
    nroCuenta: 1183971869,
    tipoDeCuenta: "Caja de Ahorro",
    saldoEnPesos: 8675,
    titularCuenta: "Ramon Connell",
  },
  {
    nroCuenta: 9582019689,
    tipoDeCuenta: "Caja de Ahorro",
    saldoEnPesos: 27363,
    titularCuenta: "Jarret Lafuente",
  },
  {
    nroCuenta: 1761924656,
    tipoDeCuenta: "Cuenta Corriente",
    saldoEnPesos: 32415,
    titularCuenta: "Ansel Ardley",
  },
  {
    nroCuenta: 7401971607,
    tipoDeCuenta: "Cuenta Unica",
    saldoEnPesos: 18789,
    titularCuenta: "Jacki Shurmer",
  },
];

// Desarrollo

function filtroNroCuenta(nroCuenta, cuentas){
  console.log('FILTRO POR NUMERO DE CUENTA');
  return cuentas.filter(cuenta => cuenta.nroCuenta === nroCuenta);
}

function filtroTitularCuenta(titular, cuentas){
  console.log('FILTRO POR TITULAR DE CUENTA');
  return cuentas.filter(cuenta => cuenta.titularCuenta.includes(titular));
}

function filtroTipoCuenta(tipo, cuentas){
  console.log('FILTRO POR TIPO DE CUENTA');
  return cuentas.filter(cuenta => cuenta.tipoDeCuenta == tipo);
}

function debito(cuentas, nroCuenta, monto, titular, tipo){
  if (!monto || !nroCuenta || !titular || !tipo) {
    console.log("Faltan datos de la cuenta");
    return false;
  }
  const cuenta = filtroTitularCuenta(titular, filtroTipoCuenta(tipo, filtroNroCuenta(nroCuenta, cuentas)));
  if(cuenta.length == 0){
    console.log("No se encuentra la cuenta especificada");
    return false;
  } else if(cuenta.length > 1){
    console.log("Ocurrio un error con la cuenta, contacte a soporte");
    return false;
  }
  cuenta[0].saldoEnPesos -= monto;
}

// PRUEBAS
console.log("#############################################################");
console.log(filtroNroCuenta(5486273622, arrayCuentas));
console.log("#############################################################");
console.log(filtroTipoCuenta("Cuenta Corriente", arrayCuentas));
console.log("#############################################################");
console.log(filtroTitularCuenta("Abigael Natte", arrayCuentas));
console.log("#############################################################");
console.log(arrayCuentas);
debito(arrayCuentas, 5486273622, 37771, "Abigael Natte", "Cuenta Corriente");
console.log("#############################################################");
console.log(arrayCuentas);
debito(arrayCuentas, 5486273622, 37771, "Abigael Natte");
console.log("#############################################################");
console.log(arrayCuentas);