const API_KEY = "V4ZQ8PO6D4Y6NM1Y";
let saldo = 0;
let acciones = 0;
let simboloAccion = "AAPL";

function mostrarPagina(pagina) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pagina).classList.add('active');
}

function recargarSaldo() {
    const inputSaldo = document.getElementById("inputSaldo");
    saldo = parseFloat(inputSaldo.value);
    if (saldo > 0) {
        localStorage.setItem("saldo", saldo);
        document.getElementById("balance").innerText = "Saldo: $" + saldo;
        document.getElementById("modalRecarga").style.display = "none";
    } else {
        alert("Por favor, ingresa un saldo válido.");
    }
}

window.onload = async function() {
    const saldoGuardado = parseFloat(localStorage.getItem("saldo"));
    if (saldoGuardado && saldoGuardado > 0) {
        saldo = saldoGuardado;
        document.getElementById("balance").innerText = "Saldo: $" + saldo;
        document.getElementById("modalRecarga").style.display = "none";
    }
    await obtenerPrecioAccion(simboloAccion);
};

async function obtenerPrecioAccion(simbolo) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${simbolo}&interval=5min&apikey=${API_KEY}`);
    const data = await response.json();
    const latestTime = Object.keys(data["Time Series (5min)"])[0];
    const latestPrice = data["Time Series (5min)"][latestTime]["1. open"];
    document.getElementById("currentPrice").innerText = `$${parseFloat(latestPrice).toFixed(2)}`;
}

function cambiarAccion() {
    const select = document.getElementById("accionSelect");
    simboloAccion = select.value;
    obtenerPrecioAccion(simboloAccion);
}

function comprarAcciones() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("currentPrice").innerText.replace('$', ''));
    if (cantidad > 0 && saldo >= cantidad * precio) {
        acciones += cantidad;
        saldo -= cantidad * precio;
        localStorage.setItem("saldo", saldo);
        document.getElementById("balance").innerText = "Saldo: $" + saldo;
        document.getElementById("accionesCompradas").innerText = `Acciones compradas: ${acciones}`;
    } else {
        alert("Fondos insuficientes o cantidad no válida.");
    }
}

function venderAcciones() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    if (cantidad > 0 && cantidad <= acciones) {
        const precio = parseFloat(document.getElementById("currentPrice").innerText.replace('$', ''));
        acciones -= cantidad;
        saldo += cantidad * precio;
        localStorage.setItem("saldo", saldo);
        document.getElementById("balance").innerText = "Saldo: $" + saldo;
        document.getElementById("accionesCompradas").innerText = `Acciones compradas: ${acciones}`;
    } else {
        alert("Cantidad no válida o no posees suficientes acciones.");
    }
}

function iniciarClase(clase) {
    alert(`Iniciando ${clase}`);
}

