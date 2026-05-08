import { inicio, llamarCiudad } from './API/api';

const climas = new Map([
    ["Clear", "soleado"],
    ["Clouds", "nublado"],
    ["Rain", "lluvia"],
    ["Snow", "nieve"]
]);

let intervalId;

document.addEventListener('DOMContentLoaded', () => {
    const btnExtender = document.getElementById('extender');

    if (btnExtender) {
        mostrarPanel(btnExtender);
    }
    traerCiudad();
    obtenerCiudad();
});


/**
 * Funcion para mostrar mas sobre el clima.
 */
function mostrarPanel(btnExtender) {
    //Obtenemos los contenedores.
    const infoCiudadBusqueda = document.getElementById('infoSimple');
    const svgFlecha = document.querySelectorAll('.svg-bnt');
    btnExtender.addEventListener('click', () => {
        //Cuando presione el boton entonces validaremos que ambas clases contengan hidden
        infoCiudadBusqueda.classList.toggle('hidden')
        svgFlecha.forEach(btn => {
            btn.classList.toggle('-rotate-180')
        });
    });
}

function obtenerCiudad() {
    const datosIn = document.getElementById('inp-ciudad');
    const btnIn = document.getElementById('btn-buscar');
    btnIn.addEventListener('click', async () => {
        //Ahora validaremos que el usuario ingresoo una ciudad o algun valor
        let valor = datosIn.value
        if (datosIn.value === '') {
            //Si esta vacia entonces regresamos un mensaje
            console.log('Ingrese una ciudad');
            return;
        }
        console.log(`La ciudad es: ${datosIn.value}`);
        try {
            const datosCity = await llamarCiudad(valor);

            let encontrado = estadoConsulta(datosCity.cod);
            if (!encontrado) return;
            //Si es un true entonces seguimos y maquetamos.
            maquetarDatos(datosCity);
            console.log(datosCity);

        } catch (error) {
            console.log(`Error del tipo: ${error}`);
        }
    });
}

function maquetarDatos(datos) {
    const contenedor = document.getElementById('contData');
    const grad = document.getElementById('text-grados');
    const ciudad = document.getElementById('text-ciudad');
    const img = document.getElementById('icono-clima');
    const url_img = 'https://openweathermap.org/img/wn/';
    const video = document.getElementById('vid-fondo');
    const videoUrl = '/public/'
    let videoClima = climas.get(datos.weather[0].main);


    img.src = `${url_img}${datos.weather[0].icon}@2x.png`;
    grad.innerText = `${Math.round(datos.main.temp)}°`
    ciudad.innerText = `${datos.sys.country}, ${datos.name}`
    contenedor.innerHTML = `
    <p class="pertenece-dato">Maxima: <span class="valor-dato">${datos.main.temp_max}°</span></p>
    <p class="pertenece-dato">Minima: <span class="valor-dato">${datos.main.temp_min}°</span></p>
    <p class="pertenece-dato">Sensación de:  <span class="valor-dato">${datos.main.feels_like}°</span></p>
    <p class="pertenece-dato">Humedad: <span class="valor-dato">${datos.main.humidity}%</span></p>
    <p class="pertenece-dato">Viento: <span class="valor-dato">${datos.wind.speed}km/h</span></p>
    <p class="pertenece-dato">Visibilidad: <span class="valor-dato">${datos.visibility / 1000}km</span></p>
    <p class="pertenece-dato">Clima: <span class="valor-dato">${datos.weather[0].description}</span></p>
    <p class="pertenece-dato">Presion Atmosferica: <span class="valor-dato">${datos.main.pressure}hPa</span></p>


    `
    // Cambia el video dependiendo del tamaño de la pantalla
    if (window.innerWidth < 1024) {
        //Medidas para dispositivos como telefonos o tablets.
        video.src = `${videoUrl}${videoClima}mb.mp4`;
    } else {
        video.src = `${videoUrl}${videoClima}.mp4`;
    }
    // Hora y fecha 
    fechaYHora(datos.timezone);
}


function estadoConsulta(estado) {
    if (estado === '404') {
        //Aqui abrimos una alerta para avisar que no se encontro una ciudad.
        console.log('Ubicacion no encontrada.');
        return false;
    }
    return true;
}

async function traerCiudad() {
    try {
        const datos = await inicio();
        console.log(datos);

        maquetarDatos(datos);
    } catch (error) {
        console.log(`Error del tipo: ${error}`)
    }
}


function fechaYHora(timezone) {
    const contHora = document.getElementById('hora');
    const contFecha = document.getElementById('fecha');


    if (intervalId)
        clearInterval(intervalId)

    intervalId = setInterval(() => {
        const ahora = new Date();
        const utc = ahora.getTime() + (ahora.getTimezoneOffset() * 60000);
        const horaCiudad = new Date(utc + (1000 * timezone));
        contFecha.innerText = horaCiudad.toLocaleDateString();
        contHora.innerText = horaCiudad.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
}