
const llave = "c6f4ab445d38568f88037d106e859c9d";
const URL = "https://api.openweathermap.org/data/2.5/weather";
const ciudad = 'Ixtapaluca';

export async function llamarCiudad(city) {
    const respuesta = await fetch(`${URL}?q=${city}&appid=${llave}&units=metric`)
    if (!respuesta.ok) console.log('error en la consulta.');
    return await respuesta.json();
}


export async function inicio() {

    const respuesta = await fetch(`${URL}?q=${ciudad}&appid=${llave}&units=metric`)

    if (!respuesta.ok) console.log('error en la consulta.');
    return await respuesta.json();

}
