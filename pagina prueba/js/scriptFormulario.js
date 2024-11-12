//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■FORMULARIO■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import {urlComercial, convertToJson} from "./utilidades.js";
//si quisiera TRAERME TODO lo que hay en utilidades.. puedo usar esto
//import * as util from "./utilidades.js";

//const { response } = require("express");
let formulario;
//recuperar el elemento del formulario
window.onload=function(){
    formulario=document.getElementById("formulario"); 
    
    //↓↓↓↓ cuando el formulario escuche que se produjo un submit, me ejecutas la funcion e (elemento)
    formulario.addEventListener('submit', function(e){  //esto del submit es un evento, lo de onclick etc.. es lo mismo
    //🛑⚠️alert("le diste a submit");                 //⬆️esta e da igual el nombre que tenga pues solo existe en esta funcion, la e se entiende como evento, asi que al ocurrir el submit lo toma como evento
    e.preventDefault(); //⬅️esto me dice, tu evento, no me hagas nada, tan solo sigue adelante
    crearComercial();//llamo a la funcion que hago abajo, y como le llamo aqui directamente, no tengo que llamarle desde el html como onclick
    });
};

    function crearComercial() {
         //🛑⚠️alert("llamada JS");
        
        const urlCrearComercial=urlComercial+"/crear";

        var datos= new FormData(formulario); //crea un formulario tipo form data , de este modo podemos interactuar con el name
        console.log(datos);
        console.log(datos.get('nombre'));
        console.log(datos.get('apellido1'));
        console.log(datos.get('apellido2'));
        console.log(datos.get('comision'));

        //en el body tenemos que enviarle los datos del formulario
        const jsonForm = convertToJson(datos); // ⬅️Llamar a la función para convertir FormData a JSON //es una funcion que tengo que crear despues

        console.log("Datos del formulario como JSON:", jsonForm);

        // Realizar la petición POST
        fetch(urlCrearComercial, {
            method: 'POST',
            body: JSON.stringify(jsonForm),  // Convertir el objeto JSON a string esto es por que si itento leer el jsonfrom directamente, mostraria que es un objeto sin mas.. por eso tengo que convertir su contenido en un string
            headers: {
                'Content-Type': 'application/json'  // le tengo que explicar que dentro del content type le estoy enviando es un application/json para que sepa interpretarlo
            }
        }).then(response => {
                console.log(response);
                return response.json(); //devuelvo la parte json de mi respuesta

        })
        .then(data => {
            console.log("ESTO ES LO QUE HAY EN DATA", data);
            pintarDatos(data); // Llamo a la función para pintar los datos
             //🛑⚠️alert("Todo OK");
            

            //💩💩💩💩💩💩💩AYUDA NO SE POR QUE ASI NO ME FUNCIONA Y CON PINTARDATOS SI💩💩💩💩💩💩💩
            //Diferencias clave:
            // textContent es útil si solo quieres mostrar los datos como texto plano o en formato JSON.
            // innerHTML es más adecuado si necesitas mostrar los datos con formato HTML (como títulos, párrafos, etc.), que es lo que estás haciendo en la función pintarDatos.
            // const resultados = document.getElementById("resultado");
            // resultados.textContent = JSON.stringify(data.data)
        })
        .catch(error=>{
            console.log("Error en crear comercial "+error.message);
            //errorElement.textContent="Error fetching data: "+ error.message;
        })

        formulario.reset();
    };
    // Función para pintar los datos en el div
    function pintarDatos(data) {
        const resultadoComercial = document.getElementById("resultadoComercial");
        
        
        // Crear un HTML que muestre los datos de manera legible
        let contenido = `<h3>Comercial creado:</h3>
                         <p><strong>Nombre:</strong> ${data.nombre}</p>
                         <p><strong>Apellido 1:</strong> ${data.apellido1}</p>
                         <p><strong>Apellido 2:</strong> ${data.apellido2}</p>
                         <p><strong>Comisión:</strong> ${data.comision}</p>`;
        
        // Asignar ese contenido al div
        resultadoComercial.innerHTML = contenido;
    }
//⬇️⬇️⬇️ lo he pasado a utilidades
// function convertToJson(FormData){
//     let jsonObject = {}; //variable json
//     //por cada valor clave que tengo en el jsondatas
//     FormData.forEach((value, key) => {
//         //asigna un valor a un atributo del objeto
//         jsonObject[key] = value;
//     });
//     console.log("JSON generado:", jsonObject);  // Verificar que el JSON se crea correctamente
//     return jsonObject;
// }



