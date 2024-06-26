const { Router } = require("express");
const { getPlantillas, guardarPlantilla } = require("../controllers/plantillaController");
const plantillaRoutes = Router();

plantillaRoutes.get("/:companyId", async (req, res) => {
  try {
    const reportes = await getPlantillas(req.params.companyId);
    res.status(200).json(reportes);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

plantillaRoutes.post("/", async (req, res) => {
    try {
      const reportes = await guardarPlantilla(req.body);
      res.status(200).json(reportes);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

module.exports = plantillaRoutes;
