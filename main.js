let saldo = 0;
let accionesCompradas = {};
let simboloAccion = 'AAPL'; // Acción por defecto

// Escuchar el evento de scroll para cambiar la cabecera
window.onscroll = function () {
    const header = document.querySelector(".header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

// Función para mostrar la página seleccionada
function mostrarPagina(pagina) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
        page.classList.remove('active');
    });
    document.getElementById(pagina).classList.add('active');
}

// Función para recargar saldo
function recargarSaldo() {
    const inputSaldo = document.getElementById('inputSaldo');
    saldo += parseFloat(inputSaldo.value);
    document.getElementById('balance').innerText = `Saldo: $${saldo.toFixed(2)}`;
    inputSaldo.value = ''; // Limpiar el campo de entrada
    mostrarPagina('inicio');
}

// Función para iniciar clase
function iniciarClase(clase) {
    alert(`Iniciando ${clase}`);
}

// Función para comprar acciones
function comprarAcciones() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }
    const costo = cantidad * parseFloat(document.getElementById('currentPrice').innerText);
    if (costo > saldo) {
        alert("No tiene suficiente saldo para realizar esta compra.");
    } else {
        saldo -= costo;
        accionesCompradas[simboloAccion] = (accionesCompradas[simboloAccion] || 0) + cantidad;
        document.getElementById('balance').innerText = `Saldo: $${saldo.toFixed(2)}`;
        mostrarAccionesCompradas();
    }
}

// Función para vender acciones
function venderAcciones() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }
    if (accionesCompradas[simboloAccion] < cantidad) {
        alert("No tiene suficientes acciones para vender.");
    } else {
        const ingreso = cantidad * parseFloat(document.getElementById('currentPrice').innerText);
        saldo += ingreso;
        accionesCompradas[simboloAccion] -= cantidad;
        document.getElementById('balance').innerText = `Saldo: $${saldo.toFixed(2)}`;
        mostrarAccionesCompradas();
    }
}

// Función para mostrar acciones compradas
function mostrarAccionesCompradas() {
    const accionesDiv = document.getElementById('accionesCompradas');
    accionesDiv.innerHTML = '<h3>Acciones Compradas:</h3>';
    for (const [accion, cantidad] of Object.entries(accionesCompradas)) {
        accionesDiv.innerHTML += `<p>${accion}: ${cantidad}</p>`;
    }
}

// Función para obtener precio de la acción
async function obtenerPrecioAccion(simbolo) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${simbolo}&interval=1min&apikey=V4ZQ8PO6D4Y6NM1Y`);
    const data = await response.json();
    const lastKey = Object.keys(data['Time Series (1min)'])[0];
    const lastData = data['Time Series (1min)'][lastKey];
    const precio = lastData['1. open'];
    document.getElementById('currentPrice').innerText = `$${parseFloat(precio).toFixed(2)}`;
}

// Función para cambiar acción
function cambiarAccion() {
    simboloAccion = document.getElementById('accionSelect').value;
    document.getElementById('accionActual').innerText = simboloAccion;
    obtenerPrecioAccion(simboloAccion);
}

// Inicializar la gráfica
const widget = new TradingView.widget({
    "container_id": "tradingview-chart",
    "width": "100%",
    "height": "500px",
    "symbol": "NASDAQ:AAPL",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "es",
    "allow_symbol_change": true,
    "details": true,
    "studies": [
        "MACD@tv-basicstudies",
        "RSI@tv-basicstudies"
    ],
    "show_popup_button": true,
    "popup_width": "1000",
    "popup_height": "650",
    "user_legacy": false,
});
