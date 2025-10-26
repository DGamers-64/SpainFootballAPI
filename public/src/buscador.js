import generarEquipo from "../components/equipo.js"
import tablaDivision from "../components/tablaDivision.js"

export default class Buscador {
    static async buscarClasificacion(temporada, division) {
        const contenidoPrincipal = document.getElementById("contenido")

        if (temporada != "---" && division != "---") {
            contenidoPrincipal.innerHTML = ""

            let clasificacionFetch
            let divisionFetch
        
            await fetch(`/api/v1/clasificacion/${temporada}/${division}`)
                .then(res => res.json())
                .then(data => clasificacionFetch = data)
                .catch(err => console.error(err))

            await fetch(`/api/v1/division/${temporada}/${division}`)
                .then(res => res.json())
                .then(data => divisionFetch = data)
                .catch(err => console.error(err))

            const data = {
                division: divisionFetch,
                clasificacion: clasificacionFetch
            }

            contenidoPrincipal.className = "division"
            contenidoPrincipal.innerHTML += tablaDivision(data)

            const equipos = contenidoPrincipal.querySelectorAll(".division > table > tbody > tr > td:nth-child(2)")

            equipos.forEach(e => {
                e.addEventListener("click", () => {
                    Buscador.buscarEquipo(e.dataset.temporada, e.dataset.division, e.dataset.equipo)
                })
            })
        }
    }

    static async buscarEquipo(temporada, division, equipo) {
        const contenidoPrincipal = document.getElementById("contenido")

        if (temporada != "---" && division != "---") {
            contenidoPrincipal.innerHTML = ""

            let equipoFetch
        
            await fetch(`/api/v1/equipo/${temporada}/${equipo}`)
                .then(res => res.json())
                .then(data => equipoFetch = data)
                .catch(err => console.error(err))

            contenidoPrincipal.className = "equipo"
            contenidoPrincipal.innerHTML += generarEquipo(equipoFetch)

            const competiciones = contenidoPrincipal.querySelectorAll(".equipo > #competiciones > table > tbody > tr > td")

            competiciones.forEach(e => {
                e.addEventListener("click", () => {
                    Buscador.buscarClasificacion(e.dataset.temporada, e.dataset.competicion)
                })
            })
        }
    }
}