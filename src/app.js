const express = require("express")
const app = express()
const indexRoutes = require("./routes/index")
const path = require("node:path")
const cors = require("cors")
const morgan = require("morgan")
app.use(cors())
function guardarRegistro(usuario, archivo) {
    // Aquí va la lógica para guardar el registro en la base de datos
    console.log(`Usuario ${usuario} ha visto el archivo ${archivo}`);
}

// Middleware personalizado para capturar las solicitudes de archivos
app.use('/uploads', function(req, res, next) {
    // Aquí puedes obtener el nombre del archivo y el usuario (por ejemplo, desde una sesión)
    const archivoSolicitado = path.basename(req.url);
    const usuario = 'nombreUsuario'; // Aquí debes obtener el nombre del usuario de manera adecuada

    // Guardar el registro en la base de datos
    guardarRegistro(usuario, archivoSolicitado);

    // Continuar con la solicitud original
    next();
});

app.set('trust proxy', true);
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(morgan("dev"))
app.use("/", indexRoutes)

module.exports = app