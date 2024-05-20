const firebase = require("firebase-admin");

const serviceAccount = require("./firebase.json")

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})

const sendNotificationReporte = async (token) => {
    try{
        await firebase.messaging().send({
            token:token,
            notification:{
                title:"Nuevo reporte",
                body:"Alguien ha creado un nuevo reporte"
            }
        })
    }catch(e){
        console.log("Ha ocurrido un error: ", e)
    }
}

module.exports = {firebase, sendNotificationReporte}