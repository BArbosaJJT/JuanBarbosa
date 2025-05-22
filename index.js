function Obtener_datos() {
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  return [n1, n2];
}

function sumar() {
  const [n1, n2] = Obtener_datos();
  document.getElementById("resultado").innerText =
    "Resultado de la Suma es: " + (n1 + n2);
}

function restar() {
  const [n1, n2] = Obtener_datos();
  document.getElementById("resultado").innerText =
    "Resultado de la Resta es: " + (n1 - n2);
}

function multiplicar() {
  const [n1, n2] = Obtener_datos();
  document.getElementById("resultado").innerText =
    "Resultado de la Multiplicación es: " + n1 * n2;
}

function dividir() {
  const [n1, n2] = Obtener_datos();
  if (n2 === 0) {
    document.getElementById("resultado").innerText =
      "Error: No se puede dividir entre cero.";
  } else {
    document.getElementById("resultado").innerText =
      "Resultado de la División es: " + n1 / n2;
  }
}


