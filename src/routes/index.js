const {Router} = require("express")
const usuarioRoutes = require("./usuarioRoutes")
const tramiteRoutes = require("./tramiteRoutes")
const documentosRoutes = require("./documentosRoutes")
const auditoriaRoutes = require("./auditoriaRoutes")
const indexRoutes = Router()

indexRoutes.use("/usuario", usuarioRoutes)
indexRoutes.use("/tramite", tramiteRoutes)
indexRoutes.use("/documentos", documentosRoutes)
indexRoutes.use("/auditoria", auditoriaRoutes)

module.exports = indexRoutes