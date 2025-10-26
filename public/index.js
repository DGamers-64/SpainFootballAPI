import tablaDivision from "./components/tablaDivision.js"

let contenidoPrincipal

document.addEventListener("DOMContentLoaded", async () => {
    const botonClasificacion = document.querySelector("#clasificacion button")
    contenidoPrincipal = document.getElementById("contenido")

    // PREPARAR ASIDE

    prepararClasificacion()

    // PREPARAR BOTONES

    botonClasificacion.addEventListener("click", buscarClasificacion)
})

async function prepararClasificacion() {
    await fetch("/api/v1/division")
        .then(res => res.json())
        .then(divisiones => {
            const select = document.querySelector("#clasificacion .division-select")
            divisiones.forEach(e => {
                select.innerHTML += `<option value="${e.nombre}">${e.nombre}</option>`
            });

            select.addEventListener("input", () => {
                const selectTemporadas = document.querySelector("#clasificacion .temporada-select")

                const temporadas = divisiones
                    .filter(e => e.nombre === select.value)
                    .map(e => e.temporada)

                selectTemporadas.innerHTML = "<option value='---'>---</option>"
                
                temporadas.forEach(e => {
                    selectTemporadas.innerHTML += `<option value="${e}">${e}</option>`
                })
            })
        })
}

async function buscarClasificacion() {
    const temporada = document.querySelector("#clasificacion .temporada-select").value
    const division = document.querySelector("#clasificacion .division-select").value

    if (temporada != "---" && division != "---") {
        contenidoPrincipal.innerHTML = ""
    
        await fetch(`/api/v1/clasificacion/${temporada}/${division}`)
            .then(res => res.json())
            .then(data => {
                contenidoPrincipal.className = "clasificacion"
                contenidoPrincipal.innerHTML += tablaDivision(data)
            })
            .catch(err => console.error(err))
    }
}