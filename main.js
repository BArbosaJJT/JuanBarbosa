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
    } else {
        document.getElementById("modalRecarga").style.display = "flex";
    }

    cargarGrafico(simboloAccion);
    await obtenerPrecioAccion(simboloAccion);
};

function cargarGrafico(simbolo) {
    new TradingView.widget({
        "container_id": "tradingview-chart",
        "width": "100%",
        "height": "500",
        "symbol": `NASDAQ:${simbolo}`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "es",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "studies": ["RSI@tv-basicstudies"]
    });
}

async function obtenerPrecioAccion(simbolo) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${simbolo}&interval=5min&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const timeSeries = data['Time Series (5min)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestPrice = timeSeries[latestTime]['1. open'];
        document.getElementById('currentPrice').innerText = "$" + parseFloat(latestPrice).toFixed(2);
    } catch (error) {
        console.error("Error al obtener el precio de la acción:", error);
    }
}

function cambiarAccion() {
    const select = document.getElementById('accionSelect');
    simboloAccion = select.value;
    cargarGrafico(simboloAccion);
    obtenerPrecioAccion(simboloAccion);
}

function comprarAcciones() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("currentPrice").innerText.replace('$', ''));
    const totalCompra = cantidad * precio;
    if (cantidad > 0 && totalCompra <= saldo) {
        saldo -= totalCompra;
        acciones += cantidad;
        localStorage.setItem("saldo", saldo);
        document.getElementById("balance").innerText = "Saldo: $" + saldo;
        mostrarAcciones();
    } else {
        alert("Saldo insuficiente o cantidad no válida.");
    }
}

function venderAcciones() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("currentPrice").innerText.replace('$', ''));
    if (cantidad > 0 && cantidad <= acciones) {
        const totalVenta = cantidad * precio;
        saldo += totalVenta;
        acciones -= cantidad;
        localStorage.set

