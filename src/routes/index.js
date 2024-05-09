const {Router} = require("express")
const usuarioRoutes = require("./usuarioRoutes")
const tramiteRoutes = require("./tramiteRoutes")
const documentosRoutes = require("./documentosRoutes")
const auditoriaRoutes = require("./auditoriaRoutes")
const reporteRoutes = require("./reporteRoutes")
const grupoRoutes = require("./grupoRoutes")
const plantillaRoutes = require("./plantillaRoutes")
const indexRoutes = Router()

indexRoutes.use("/usuario", usuarioRoutes)
indexRoutes.use("/tramite", tramiteRoutes)
indexRoutes.use("/documentos", documentosRoutes)
indexRoutes.use("/auditoria", auditoriaRoutes)
indexRoutes.use("/reporte", reporteRoutes)
indexRoutes.use("/grupo", grupoRoutes)
indexRoutes.use("/plantilla", plantillaRoutes)


module.exports = indexRoutes