export default function generarEquipo(data) {
    let elemento = `
    <div id="info">
        <img src="${data.division.urlLogo}">
        <div id="info-general">
            <h2>${data.division.nombre}</h2>
            <h3>${data.division.temporada}</h3>
        </div>
    </div>`

    return elemento
}