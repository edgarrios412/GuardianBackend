const { Usuario, Grupo,System } = require("../db");

module.exports = {
  newUser: async (data) => {
    const usuario = await Usuario.create(data);
    return usuario;
  },
  getUsers: async () => {
    const usuarios = await Usuario.findAll({
      include:[{
        model:Grupo
      }]
    });
    return usuarios;
  },
  getUsersById: async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("El usuario ingresado no existe");
    return usuario;
  },
  getUsersOrderByGroup: async () => {
    const usuarios = await Usuario.findAll({
      include:[{
        model:Grupo
      }]
    });
    console.log(usuarios)
    const usuariosPorGrupo = usuarios.reduce((acc, current) => {
      if(acc[current.grupo.nombre]){
        acc[current.grupo.nombre] = [...acc[current.grupo.nombre], current]
      }else{
        acc[current.grupo.nombre] = [current]
      }
      return acc
    },{})
    return usuariosPorGrupo;
  },
  editUser: async (data, id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("El usuario ingresado no existe");
    for (const key in data) {
      usuario[key] = data[key];
    }
    await usuario.save();
    return usuario;
  },
  authUser: async (data) => {
    const usuario = await Usuario.findOne({
      where: {
        email: data.usuario,
        password: data.password,
      },
    });
    if (!usuario) throw new Error("El usuario ingresado no existe");
    return usuario;
  },
  verSistema: async() => {
    const system = await System.findByPk(1)
    return system
  }
};
