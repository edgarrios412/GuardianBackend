const { Auditoria } = require("../db");

module.exports = {
  getAuditorias: async (companyId) => {
    const auditorias = await Auditoria.findAll({
      where:{
        companyId:companyId
      }
    });
    return auditorias;
  },
  getAuditoriaById: async (id) => {
    const auditoria = await Auditoria.findByPk(id, {
      include: [
        {
          model: Usuario,
        },
      ],
    });
    if (!auditoria) throw new Error("El auditoria ingresado no existe");
    return auditoria;
  },
};
