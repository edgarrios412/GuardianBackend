const { Router } = require("express");
const { getGrupos, createGrupo, editGrupo } = require("../controllers/grupoController");
const grupoRoutes = Router();

grupoRoutes.get("/:companyId", async (req, res) => {
  try {
    const reportes = await getGrupos(req.params.companyId);
    res.status(200).json(reportes);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

grupoRoutes.post("/", async (req, res) => {
    try {
      const reportes = await createGrupo(req.body);
      res.status(200).json(reportes);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

grupoRoutes.put("/:id", async (req, res) => {
    try {
      const reportes = await editGrupo(req.params.id, req.body.nombre);
      res.status(200).json(reportes);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

module.exports = grupoRoutes;
