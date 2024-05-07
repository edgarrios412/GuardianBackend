const { Grupo, Usuario } = require("../db");

module.exports = {
  getGrupos: async () => {
    const reportes = await Grupo.findAll({
      include:[{
        model:Usuario
      }]
    });
    return reportes;
  },
  createGrupo: async (data) => {
    await Grupo.create(data);
    return "Grupo creado exitosamente";
  },
  editGrupo: async (id, nombre) => {
    const grupo = await Grupo.findByPk(id)
    if(!grupo) throw new Error("El grupo indicado no existe")
    grupo.nombre = nombre
    await grupo.save()
    return "Grupo editado exitosamente"
  }
};
