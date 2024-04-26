const { Router } = require("express");
const { getTramites, getTramiteById, newTramite, editTramite, getTramiteByUsuario} = require("../controllers/tramiteController");
const tramiteRoutes = Router();

tramiteRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let tramite;
    if (id == "all") {
      tramite = await getTramites();
    } else {
      tramite = await getTramiteById(id);
    }
    res.status(200).json(tramite);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

tramiteRoutes.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tramite = await getTramiteByUsuario(id);
    res.status(200).json(tramite);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

tramiteRoutes.post("/", async (req, res) => {
  try {
    const tramite = await newTramite(req.body)
    res.status(200).json(tramite);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

tramiteRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tramite = await editTramite(req.body, id);
    res.status(200).json(tramite);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = tramiteRoutes;
