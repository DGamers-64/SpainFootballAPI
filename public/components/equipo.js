export default function generarEquipo(data) {
    let elemento = `
    <div id="escudo">
        <img src="${data.urlEscudo}">
    </div>
    <div id="info">
        <h2>${data.nombre}</h2>
        <h3>${data.temporada}</h3>
        <div id="trofeos">`
    
    Object.entries(data.titulos).forEach(([k, e]) => {
        let tituloImg 
        if (data.todasDivisiones.find(d => d.nombre == k)) tituloImg = data.todasDivisiones.find(d => d.nombre == k).urlTrofeo
        else tituloImg = "https://cdn-icons-png.flaticon.com/512/6372/6372150.png"
        elemento += `<div class="trofeo">
            <img src="${tituloImg}" title="${k}" alt="${k}">
            <span>${e}</span>
        </div>`
        
    })

    elemento += `</div>
    </div>
    <div id="estadio">
        <h3>${data.estadio}</h3>
        <div id="mapa"></div>
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