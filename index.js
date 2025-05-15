function Obtener_datos() {
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  return [n1, n2];
}

function sumar() {
  const [n1, n2] = Obtener_datos();
  let r_suma = n1 + n2;
  document.getElementById("resultado").innerText =
    "Resultado de la Suma es: " + r_suma;
}

