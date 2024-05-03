const { Router } = require("express");
const { getDocumentos, getDocumentoById, newDocumento, editDocumento, getDocumentoByUsuario, wordToPdf, uploadFile} = require("../controllers/documentosController");
const { upload } = require("../helpers/multer");
const documentosRoutes = Router();

documentosRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let documento;
    if (id == "all") {
      documento = await getDocumentos();
    } else {
      documento = await getDocumentoById(id);
    }
    res.status(200).json(documento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

documentosRoutes.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const documento = await getDocumentoByUsuario(id);
    res.status(200).json(documento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

documentosRoutes.post("/:tramite", upload.single("file"),async (req, res) => {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  try {
    var documento;
    if(req.params.tramite == "null"){
      documento = await uploadFile(req.file,ip)
    }else{
      documento = await newDocumento(req.file,req.params.tramite,ip)
    }
    res.status(200).json(documento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

documentosRoutes.post("/convert/toPdf", upload.single("file"),async (req, res) => {
  try {
    console.log(req.body)
    const documento = await wordToPdf(req.file.filename,req.body.tramiteId)
    console.log(documento)
    res.status(200).json(documento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

documentosRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const documento = await editDocumento(req.body, id);
    res.status(200).json(documento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = documentosRoutes;
