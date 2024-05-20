const { Router } = require("express");
const { getAuditoriaById, getAuditorias } = require("../controllers/auditoriaController");
// const { getDocumentos, getDocumentoById, newDocumento, editDocumento, getDocumentoByUsuario} = require("../controllers/documentosController");
const auditoriaRoutes = Router();

auditoriaRoutes.get("/:id/:companyId", async (req, res) => {
  const { id, companyId } = req.params;
  try {
    let auditorias;
    if (id == "all") {
      auditorias = await getAuditorias(companyId);
    } else {
      auditorias = await getAuditoriaById(id);
    }
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = auditoriaRoutes;
