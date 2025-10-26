export default class PreparacionAside {
    static async prepararClasificacion() {
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
    
    static async prepararEquipo() {
        await fetch("/api/v1/division")
            .then(res => res.json())
            .then(divisiones => {
                const select = document.querySelector("#equipos .division-select")
                const selectTemporadas = document.querySelector("#equipos .temporada-select")
                const selectEquipos = document.querySelector("#equipos .equipo-select")
    
                divisiones.forEach(e => {
                    select.innerHTML += `<option value="${e.nombre}">${e.nombre}</option>`
                });
    
                select.addEventListener("input", async () => {
    
                    const temporadas = divisiones
                        .filter(e => e.nombre === select.value)
                        .map(e => e.temporada)
    
                    selectTemporadas.innerHTML = "<option value='---'>---</option>"
                    
                    temporadas.forEach(e => {
                        selectTemporadas.innerHTML += `<option value="${e}">${e}</option>`
                    })
    
                    selectTemporadas.addEventListener("input", async () => {
                        await fetch("/api/v1/equipo")
                            .then(res => res.json())
                            .then(equipos => {
                                const equiposFiltrados = equipos.filter(e => 
                                    e.temporada == selectTemporadas.value && e.competiciones.includes(select.value)
                                )

                                selectEquipos.innerHTML = "<option value=''>---</option>"

                                equiposFiltrados.forEach(eq => {
                                    selectEquipos.innerHTML += `<option value="${eq.nombre}">${eq.nombre}</option>`
                                })
                            })
                    })
    
                })
            })
    }
}
