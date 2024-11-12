//aqui meto los datos y/o funciones que no son neutras, que valen para cualquier cosa
// para que esto funcione tengo que añadirlo en html como type modulo y ademar importarlo en el js que lo usara
const servidor="http://localhost:3000/";

const urlComercial=servidor+"comercial";
const urlCliente= servidor+"cliente";

function convertToJson(FormData){
    let jsonObject = {}; //variable json
    //por cada valor clave que tengo en el jsondatas
    FormData.forEach((value, key) => {
        //asigna un valor a un atributo del objeto
        jsonObject[key] = value;
    });
    console.log("JSON generado:", jsonObject);  // Verificar que el JSON se crea correctamente
    return jsonObject;
}

export{
    urlComercial,
    urlCliente,
    convertToJson
};