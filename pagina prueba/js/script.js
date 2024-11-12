import {urlComercial} from "./utilidades.js";
//const { response } = require("express")
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■BUSCAR■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.buscar=buscar; //esto es a modo de puente, al usar un meto
function buscar() {
    //const errorElement= document.getElementById("error")
    //errorElement.textContent=""

   

    
    //⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙MIRAR ESTO DE AQUI ABAJO⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
    fetch(urlComercial, {method:'GET'}).then(//en este then recibimos la respuesta del servidor y se guarda en la variable response. La informacion de la respuesta la podremos gestionar y recuperar y enviar el json que nos ha llegado

        /* ______________________________________________________________________________________________________
         ⟪⟪⟪ fetch(url).then ⟫⟫⟫ 
         fetch(): hacer una solicitud HTTP (por ejemplo, GET o POST) a una URL especificada
         url  URL de una API o cualquier archivo en el servidor.
         .then recibe la informacion y puedes 
        
        
        ⟪⟪⟪ EXPLICACION FUNCION FLECHA ⟫⟫⟫ 
         => esto se llama funcion flecha, de normal una funcion seria
                function nombreFuncion(argumentos){
                    return argumentos.data
                }
                y luego se le llama
                let datos=nombreFuncion(objetoJSON)


        response => {}
        lo que envia/argumentos sera lo que se guarda en el response
        sobre la informacion que me llegue en el argumento (response) ejecutame (=>)esto({})

        ———————————————————————————————————————————————————————————————————————————————————————————————————————*/
        response => { 
            console.log(response);
            return response.json(); //al ponerle .json resuperamos el json que tuviera el response
        }).then(//el then implica que lo saque de arriba me lo guarde en data
            data=>{
                console.log(data);
                const arrayComercial= data.data;
                rellenarTabla(arrayComercial);
                //errorElement.textContent="Hemos recuperado el json."
            }).catch(error => {
                console.log("Error en catch: " + error.message);
                //errorElement.textContent = "Error fetching data: " + error.message;
                console.log("Respuesta en error: ", error); // Verifica si hay un problema con la respuesta
            });

}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■rellenar■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function rellenarTabla(data) {
    const table = document.getElementById("resultados");
    table.innerHTML = "";

    let out = "";
    for (let item of data) {
        out += "<tr>";
        for(let value of Object.values(item)){//sacame todos los valores de item que es un objeto
            out += "<td>" + value + "</td>";
        }
        //ESTO ES LO MISMO QUE EL FOR DE ARRIBA, PERO AMPLIADO Y DE MANERA SIMPLE PERO MENOS EFICAZ
        // out += "<td>" + item.id + "</td>";
        // out += "<td>" + item.nombre + "</td>";
        // out += "<td>" + item.apellido1 + "</td>";
        // out += "<td>" + item.apellido2 + "</td>";
        // out += "<td>" + item.comision + "</td>";
        out += "</tr>";
    }
    table.innerHTML = out;
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■BUSCAR por ID■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.buscarID = buscarID;
function buscarID() {
    const idComercial = document.getElementById("identificador").value;
    const urlIdComercial = urlComercial + "/buscar/" +idComercial;
    const resultadoDiv = document.getElementById("resultadoComercialID");
    resultadoDiv.innerText = ""; // Limpiar el resultado previo

    fetch(urlIdComercial, { method: 'GET' })
        .then(response => response.json())
        .then(data => {  
            console.log(data); // Verificar el contenido de data en consola

            // Verificamos si data es un array con al menos un elemento
            if (Array.isArray(data) && data.length > 0) {
                const comercial = data[0];
                resultadoDiv.innerText = `ID: ${comercial.id}, Nombre: ${comercial.nombre}, Apellido1: ${comercial.apellido1}, Apellido2: ${comercial.apellido2}, Comisión: ${comercial.comision}`;
            } else {
                resultadoDiv.innerText = "Comercial no encontrado.";
            }
        })
        .catch(error => {
            console.log("Error en catch: " + error.message);
            resultadoDiv.innerText = "Error al obtener los datos: " + error.message;
        });
}


