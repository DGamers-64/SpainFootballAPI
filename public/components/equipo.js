export default function generarEquipo(data) {
    let elemento = `
    <div id="escudo">
        <img src="${data.urlEscudo}">
    </div>
    <div id="info">
        <h2>${data.nombre}</h2>
        <h3>${data.temporada}</h3>
    </div>
    <div id="competiciones">
        <table>
            <thead>
                <tr>
                    <th>Competición</th>
                </tr>
            </thead>
            <tbody>`
    
    data.competiciones.forEach(e => {
        elemento += `
        <tr>
            <td data-temporada="${data.temporada}" data-competicion="${e}">${e}</td>
        </tr>
        `
    })
            
    elemento += `</tbody>
        </table>
    </div>
    `

    return elemento
}