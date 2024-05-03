const {Router} = require("express")
const usuarioRoutes = require("./usuarioRoutes")
const tramiteRoutes = require("./tramiteRoutes")
const documentosRoutes = require("./documentosRoutes")
const auditoriaRoutes = require("./auditoriaRoutes")
const reporteRoutes = require("./reporteRoutes")
const indexRoutes = Router()

indexRoutes.use("/usuario", usuarioRoutes)
indexRoutes.use("/tramite", tramiteRoutes)
indexRoutes.use("/documentos", documentosRoutes)
indexRoutes.use("/auditoria", auditoriaRoutes)
indexRoutes.use("/reporte", reporteRoutes)

module.exports = indexRoutes