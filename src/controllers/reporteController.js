const { Reporte, Usuario } = require("../db");

module.exports = {
  getReportes: async (id, companyId) => {
    let reportes;
    if (id == "all") {
      reportes = await Reporte.findAll({
        where:{
          companyId:companyId
        },
        include: [
          {
            model: Usuario,
          },
        ],
      });
    } else {
      reportes = await Reporte.findByPk(id, {
        where:{
            companyId:companyId
        },
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
