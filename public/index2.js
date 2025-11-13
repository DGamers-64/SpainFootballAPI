document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input")
    const boton = document.querySelector("button")
    const tabla = document.getElementById("tabla-container")
    const tbody = document.querySelector("tbody")

    boton.addEventListener("click", async () => {
        await fetch("http://localhost:6123/api/v1/equipo")
            .then(res => res.json())
            .then(data => {
                tbody.innerHTML = ""
                data.forEach(e => {
                    // tbody.innerHTML += `
                    //     <tr>
                    //         <td>${e.abreviacion}</td>
                    //         <td><img src="${e.urlEscudo}"></td>
                    //         <td>${e.nombre}</td>
                    //         <td>${e.competiciones.length}</td>
                    //     </tr>
                    // `

                    if (e.competiciones.includes(input.value)) {
                        tabla.style.display = "block"
                        const tds = [
                            document.createElement("td"),
                            document.createElement("td"),
                            document.createElement("td"),
                            document.createElement("td"),
                        ]
        
                        const tr = document.createElement("tr")
                        const img = document.createElement("img")
                        img.src = e.urlEscudo
        
                        tds[0].textContent = e.abreviacion
                        tds[1].appendChild(img)
                        tds[2].textContent = e.nombre
                        tds[3].textContent = e.competiciones.length
        
                        tds.forEach(e => tr.appendChild(e))
                        tbody.appendChild(tr)
                    }
    
                });
            })
    })
    
})
