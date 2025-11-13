const botonBuscar = document.querySelector("#buscador button")
const equipo1Buscar = document.getElementById("buscar-equipo1")
const equipo2Buscar = document.getElementById("buscar-equipo2")

botonBuscar.addEventListener("click", async () => {
    await fetch(`/api/v1/resultado/${equipo1Buscar.value}/${equipo2Buscar.value}`)
        .then(res => res.json())
        .then(data => {
            const contenedoresInfo = document.getElementById("contenedores-info")
            data.forEach(async (e, i) => {
                const res = await fetch("/api/v1/equipo")
                const equipos = await res.json()

                const equipo1 = equipos.find(eq => eq.nombre == e.equipo1)
                const equipo2 = equipos.find(eq => eq.nombre == e.equipo2)

                const fecha = manejoFecha(e.fecha)

                contenedoresInfo.innerHTML += `
                    <div class="info" id="info-${i}">
                        <div class="sub-info" id="sub-info-1">
                            <img src="${equipo1.urlEscudo}" class="imagen" id="img-equipo1">
                            <span class="nombres" id="nombre-equipo1">${equipo1.nombre}</span>
                            <span class="goles" id="goles-equipo1">${e.goles1}</span>
                        </div>
                        <div class="sub-info" id="sub-info-2">
                            <img src="${equipo2.urlEscudo}" class="imagen" id="img-equipo2">
                            <span class="nombres" id="nombre-equipo2">${equipo2.nombre}</span>
                            <span class="goles" id="goles-equipo2">${e.goles2}</span>
                        </div>
                        <div id="fecha-restante">
                            <span>${fecha[0]}</span>
                            <span class="cuenta-atras">${fecha[1]}</span>
                        </div>
                    </div>
                `

                setInterval(() => {
                    const cuentaAtras = document.querySelector(`#info-${i} .cuenta-atras`)
                    cuentaAtras.textContent = manejoFecha(e.fecha)[1]
                }, 500)
            })
        })
})

function manejoFecha(fechaISO) {
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const fechaT = Temporal.Instant.from(fechaISO);
    const ahora = Temporal.Now.instant();

    const tiempoRestante = fechaT.until(ahora).round({ smallestUnit: "seconds", largestUnit: "days" });

    const zonedFecha = fechaT.toZonedDateTimeISO("Europe/Madrid");

    const signo = tiempoRestante.totalSeconds < 0 ? "" : "-";

    const fechaEscrita = `${dias[zonedFecha.dayOfWeek - 1]}, ${zonedFecha.day} de ${meses[zonedFecha.month - 1]} de ${zonedFecha.year}`;
    const cuentaAtras = `${signo}${String(tiempoRestante.days).padStart(2, "0")}:${String(tiempoRestante.hours).padStart(2, "0")}:${String(tiempoRestante.minutes).padStart(2, "0")}:${String(tiempoRestante.seconds).padStart(2, "0")}`;

    return [fechaEscrita, cuentaAtras];
}

/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    let tema = "claro"
    if (localStorage.getItem("tema")) {
        tema = localStorage.getItem("tema")
    }

    document.querySelector("main").className = tema
    
    const cambiarTema = document.getElementById("cambiar-tema")

    cambiarTema.addEventListener("click", () => {
        if (localStorage.getItem("tema") == "claro") {
            tema = "oscuro"
        } else {
            tema = "claro"
        }

        document.querySelector("main").className = tema
        localStorage.setItem("tema", tema)
    })
})