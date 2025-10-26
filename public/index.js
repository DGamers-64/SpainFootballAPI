import Buscador from "./src/buscador.js"
import PreparacionAside from "./src/preparacionAside.js"

let contenidoPrincipal

document.addEventListener("DOMContentLoaded", async () => {
    const botonClasificacion = document.querySelector("#clasificacion button")
    const botonEquipos = document.querySelector("#equipos button")
    
    // PREPARAR ASIDE
    
    PreparacionAside.prepararClasificacion()
    PreparacionAside.prepararEquipo()
    
    // PREPARAR BOTONES
    
    botonClasificacion.addEventListener("click", () => {
        const clasificacionSelectTemporada = document.querySelector("#clasificacion .temporada-select").value
        const clasificacionSelectDivision = document.querySelector("#clasificacion .division-select").value
        Buscador.buscarClasificacion(clasificacionSelectTemporada, clasificacionSelectDivision)
    })
    
    botonEquipos.addEventListener("click", () => {
        const equiposSelectTemporada = document.querySelector("#equipos .temporada-select").value
        const equiposSelectDivision = document.querySelector("#equipos .division-select").value
        const equiposSelectEquipo = document.querySelector("#equipos .equipo-select").value
        Buscador.buscarEquipo(equiposSelectTemporada, equiposSelectDivision, equiposSelectEquipo)
    })
})
