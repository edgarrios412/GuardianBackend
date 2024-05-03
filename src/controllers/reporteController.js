const { Reporte, Usuario } = require("../db");

module.exports = {
  getReportes: async (id) => {
    let reportes;
    if (id == "all") {
      reportes = await Reporte.findAll({
        include: [
          {
            model: Usuario,
          },
        ],
      });
    } else {
      reportes = await Reporte.findByPk(id, {
        include: [
          {
            model: Usuario,
          },
        ],
      });
    }
    return reportes;
  },
  createReporte: async (data) => {
    await Reporte.create(data);
    return "Reporte creado exitosamente";
  },
};
