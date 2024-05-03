const { Router } = require("express");
const { getReportes, createReporte } = require("../controllers/reporteController");
const reporteRoutes = Router();

reporteRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reportes = await getReportes(id);
    res.status(200).json(reportes);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

reporteRoutes.post("/", async (req, res) => {
    try {
      const reportes = await createReporte(req.body);
      res.status(200).json(reportes);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

module.exports = reporteRoutes;
