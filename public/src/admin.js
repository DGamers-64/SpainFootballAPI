import anadirEquipo from "../components/formularios/anadirEquipo.js"
import formularioAdmin from "../components/formularios/formulario.js"
import Fetch2 from "./fetch2.js"

export default class Admin {
    static abrirAdmin() {
        const contenidoPrincipal = document.getElementById("contenido")

        contenidoPrincipal.className = "admin"

        contenidoPrincipal.innerHTML = formularioAdmin()

        const selectFormulario = document.getElementById("select-formulario")

        selectFormulario.addEventListener("input", () => {
            if (document.getElementById("select-secundario")) document.getElementById("select-secundario").remove()
            Admin.abrirFormulario(selectFormulario.value)
        })
    }

    static abrirFormulario(formulario) {
        const form = document.getElementById("formulario")

        if (formulario == "anadir-equipo") {
            form.innerHTML = anadirEquipo()
            document.getElementById("anadir-equipo").addEventListener("submit", this.procesarAnadirEquipo)
        }
    }

    static procesarAnadirEquipo(e) {
        e.preventDefault()
        const fd = new FormData(e.target)
        const en = Object.fromEntries(fd.entries())

        const desdeList = fd.getAll("nombres_desde[]")
        const hastaList = fd.getAll("nombres_hasta[]")
        const valorList = fd.getAll("nombres_valor[]")

        const historico_nombres = valorList.map((e, i) => {
            return {
                desde: desdeList[i] || null,
                hasta: hastaList[i] || null,
                valor: valorList[i]
            }
        })

        const competicionTit = fd.getAll("titulo_competicion[]")
        const temporadasTit = fd.getAll("titulo_temporadas[]")

        const titulos = competicionTit.map((e, i) => {
            const temporadas = temporadasTit[i]
                                .split(",")
                                .map(t => t.trim())
                                .map(t => parseInt(t))
                                .filter(t => !isNaN(t))
            return {
                competicion: e,
                temporadas: temporadas
            }
        })

        const data = {
            id: this.slugify(en["nombre"]),
            nombre: en["nombre"],
            abreviacion: en["abreviacion"],
            escudo: en["escudo"],
            estadio: {
                nombre: en["estadio"],
                coordenadas: [ en["lat"], en["lon"] ]
            },
            titulos: titulos,
            historico: {
                nombre: historico_nombres
            }
        }

        const resultado = Fetch2.post("/api/v1/equipo", data)
        console.log(resultado)
    }

    static slugify(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }
}