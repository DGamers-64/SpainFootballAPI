export default function anadirEquipo() {
    return `
        <form id="anadir-equipo">
            <h3>Datos generales</h3>
            <div class="form-block" id="datos-generales">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre">
                <label for="abreviacion">Abreviación</label>
                <input type="text" id="abreviacion" name="abreviacion">
                <label for="escudo">Escudo</label>
                <input type="text" id="escudo" name="escudo">
            </div>
            <hr>
            <h3>Estadio</h3>
            <div class="form-block" id="estadio">
                <label for="nombre-estadio">Nombre estadio</label>
                <input type="text" id="nombre-estadio" name="estadio">
                <label for="latitud">Latitud</label>
                <input type="text" id="latitud" name="lat">
                <label for="longitud">Longitud</label>
                <input type="text" id="longitud" name="lon">
            </div>
            <hr>
            <h3>Títulos</h3>
            <div class="form-block" id="titulos">
                <button type="button" class="form-small" id="anadir-titulo">Añadir título</button>
                <div class="titulo">
                    <label>Competición</label>
                    <input type="text" class="competicion" name="titulo_competicion[]">
                    <label>Temporadas</label>
                    <input type="text" class="temporadas" name="titulo_temporadas[]">
                    <button type="button">Borrar título</button>
                </div>
            </div>
            <hr>
            <h3>Nombres históricos</h3>
            <div class="form-block" id="nombres-historicos">
                <button type="button" class="form-small" id="anadir-nombre">Añadir nombre</button>
                <div class="nombres">
                    <label>Desde</label>
                    <input type="number" class="desde" name="nombres_desde[]">
                    <label>Hasta</label>
                    <input type="number" class="hasta" name="nombres_hasta[]">
                    <label>Nombre</label>
                    <input type="text" class="valor" name="nombres_valor[]">
                    <button type="button" class="borrar-nombre">Borrar nombre</button>
                </div>
            </div>
            <hr>
            <button type="submit">Registrar equipo</button>
        </form>
    `
}