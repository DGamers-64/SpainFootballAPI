import Admin from "./src/admin.js"
import Buscador from "./src/buscador.js"
import PreparacionAside from "./src/preparacionAside.js"

let contenidoPrincipal

document.addEventListener("DOMContentLoaded", async () => {
    contenidoPrincipal = document.getElementById("contenido")
    const botonClasificacion = document.querySelector("#clasificacion button")
    const botonEquipos = document.querySelector("#equipos button")
    const botonAdmin = document.querySelector("#admin button")
    
    // PREPARAR ASIDE
    
    PreparacionAside.prepararClasificacion()
    PreparacionAside.prepararEquipo()
    
    // PREPARAR BOTONES
    
    botonClasificacion.addEventListener("click", () => {
        const temporada = document.querySelector("#clasificacion .temporada-select").value
        const division = document.querySelector("#clasificacion .division-select").value
        buscarClasificacion(temporada, division)
    })

    botonEquipos.addEventListener("click", () => {
        const temporada = document.querySelector("#equipos .temporada-select").value
        const division = document.querySelector("#equipos .division-select").value
        const equipo = document.querySelector("#equipos .equipo-select").value
        buscarEquipo(temporada, division, equipo)
    })

    botonAdmin.addEventListener("click", abrirAdmin)

    const params = new URLSearchParams(document.location.search)

    if (params.get("pag") == "clasificacion") {
        const temporada = params.get("temporada")
        const division = params.get("division")
        buscarClasificacion(temporada, division)
    } else if (params.get("pag") == "equipo") {
        const temporada = params.get("temporada")
        const division = params.get("division")
        const equipo = params.get("equipo")
        buscarEquipo(temporada, division, equipo)
    } else if (params.get("pag") == "admin") {
        abrirAdmin()
    }
})

function buscarClasificacion(temporada, division) {
    contenidoPrincipal.innerHTML = ""
    Buscador.buscarClasificacion(temporada, division)
}

function buscarEquipo(temporada, division, equipo) {
    contenidoPrincipal.innerHTML = ""
    Buscador.buscarEquipo(temporada, division, equipo)
}

function abrirAdmin() {
    contenidoPrincipal.innerHTML = ""
    Admin.abrirAdmin()
}