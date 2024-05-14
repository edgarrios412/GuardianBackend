const app = require("./src/app")
const {conn} = require("./src/db")
const PORT = process.env.PORT || 3001;
const cron = require("node-cron");
const {System} = require("./src/db");
const { sendMail } = require("./src/helpers/nodeMailer");

cron.schedule("0 7 * * *", async () => {
    const system = await System.findByPk(1)
    const diaVencimiento = new Date(system.limitDate).getDate()+1
    const diaHoy = new Date().getDate()
    if(diaHoy+2 == diaVencimiento){
        await sendMail(system.contactMail, 2, system.limitDate, system.urlpay)
        // EXPIRA EN 2 DIAS
    }else if(diaHoy+1 == diaVencimiento){
        await sendMail(system.contactMail, 1, system.limitDate, system.urlpay)
        // EXPIRA MAÑANA
    }else if(diaHoy == diaVencimiento){
        await sendMail(system.contactMail, 0, system.limitDate, system.urlpay)
        // HA EXPIRADO
    }else{
        return;
    }
    
})


conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(PORT, () => {
        console.log("Servidor en linea en el puerto "+PORT)
    })
}, (e) => console.log("Ha ocurrido un error al sincronizar la base de datos: ",e))