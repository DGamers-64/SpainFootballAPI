import anadirEquipo from "../components/formularios/anadirEquipo.js"
import formularioAdmin from "../components/formularios/formulario.js"

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
        }
    }
}