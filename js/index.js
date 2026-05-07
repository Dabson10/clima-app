document.addEventListener('DOMContentLoaded', () => {
    const btnExtender = document.getElementById('extender');

    if (btnExtender) {
        mostrarPanel(btnExtender);
    }
});


/**
 * Funcion para mostrar mas sobre el clima.
 */
function mostrarPanel(btnExtender) {
    //Obtenemos los contenedores.
    const ciudadesAtajo = document.getElementById('ciudAtajo');
    const infoCiudadBusqueda = document.getElementById('infoSimple');
    const svgFlecha = document.querySelectorAll('.svg-bnt');
    btnExtender.addEventListener('click', () => {
        //Cuando presione el boton entonces validaremos que ambas clases contengan hidden
        ciudadesAtajo.classList.toggle('hidden')
        infoCiudadBusqueda.classList.toggle('hidden')
        svgFlecha.forEach(btn => {
            btn.classList.toggle('-rotate-180')
        });
    });
}