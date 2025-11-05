import generarEquipo from "../components/equipo.js"
import tablaDivision from "../components/tablaDivision.js"
import infoDivision from "../components/infoDivision.js"
import tablaCruzada from "../components/tablaCruzada.js"
import fetchCustom from "./fetch.js"

export default class Buscador {
    static async buscarClasificacion(temporada, division) {
        const contenidoPrincipal = document.getElementById("contenido")

        if (temporada != "---" && division != "---") {
            contenidoPrincipal.innerHTML = ""

            const data = {
                division: await fetchCustom(`/api/v1/division/${temporada}/${division}`),
                clasificacion: await fetchCustom(`/api/v1/clasificacion/${temporada}/${division}`),
                resultados: await fetchCustom(`/api/v1/resultado/${temporada}/${division}`),
                equipos: await fetchCustom(`/api/v1/equipo/${temporada}`)
            }

            data.equipos = data.equipos.filter(e => e.competiciones.includes(division))

            contenidoPrincipal.className = "division"
            contenidoPrincipal.innerHTML += infoDivision(data)
            contenidoPrincipal.innerHTML += tablaDivision(data)
            contenidoPrincipal.innerHTML += tablaCruzada(data)

            document.getElementById("contenido").addEventListener("click", (e) => {
                const td = e.target.closest("td.equipos-clasificacion");
                if (!td) return;

                Buscador.buscarEquipo(
                    td.dataset.temporada,
                    td.dataset.division,
                    td.dataset.equipo
                );
            });
        }
    }

    static async buscarEquipo(temporada, division, equipo) {
        const contenidoPrincipal = document.getElementById("contenido")

        if (temporada != "---" && division != "---") {
            contenidoPrincipal.innerHTML = ""

            let data = await fetchCustom(`/api/v1/equipo/${temporada}/${equipo}`)
            data.todasDivisiones = await fetchCustom(`/api/v1/division`)

            contenidoPrincipal.className = "equipo"
            contenidoPrincipal.innerHTML += generarEquipo(data)

            const lat = data.estadioCoords[0]
            const lng = data.estadioCoords[1]

            const map = L.map('mapa', {
                zoom: 15,
                center: [lat, lng]
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(data.estadio)
                .openPopup()

            contenidoPrincipal.addEventListener("click", (e) => {
                const td = e.target.closest("td.divisiones-tabla");
                if (!td) return;

                Buscador.buscarClasificacion(td.dataset.temporada, td.dataset.competicion);
            });
        }
    }
}