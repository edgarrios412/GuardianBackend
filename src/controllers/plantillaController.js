const { Plantilla } = require("../db");

module.exports = {
  getPlantillas: async () => {
    const plantilla = await Plantilla.findAll();
    return plantilla;
  },
  guardarPlantilla: async (data) => {
    await Plantilla.create(data);
    return "Plantilla guardada exitosamente";
  }
};
