const { Plantilla } = require("../db");

module.exports = {
  getPlantillas: async (companyId) => {
    const plantilla = await Plantilla.findAll({
      where:{
        companyId:companyId
      }
    });
    return plantilla;
  },
  guardarPlantilla: async (data) => {
    await Plantilla.create(data);
    return "Plantilla guardada exitosamente";
  }
};
