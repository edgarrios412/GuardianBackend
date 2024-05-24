const { Tramite, Usuario, Documentos, Historial, Listatramites } = require("../db");

module.exports = {
  newTramite: async (data) => {
    const tramite = await Tramite.create({...data, listatramiteId:data.tramite});
    return tramite;
  },
  getTramites: async (companyId) => {
    const tramites = await Tramite.findAll({
      where:{
        companyId:companyId
      },
      include:[{
        model: Usuario
      },{
        model:Listatramites
      }]
    });
    return tramites;
  },
  createListaTramites: async (data) => {
    const tramites = await Listatramites.create(data);
    return tramites;
  },
  getListaTramites: async (companyId) => {
    const tramites = await Listatramites.findAll({
      where:{
        companyId:companyId
      }
    });
    return tramites;
  },
  editListaTramites:async (id, nombre) => {
    const tramite = await Listatramites.findByPk(id);
    if(!tramite) throw new Error("El tramite no se ha encontrado")
    tramite.nombre = nombre
    await tramite.save()
    return "Tramite editado con éxito";
  },
  getTramiteById: async (id) => {
    const tramite = await Tramite.findByPk(id, {
      include: [
        {
          model: Usuario,
        },
        {
          model:Listatramites
        }],
    });
    if (!tramite) throw new Error("El tramite ingresado no existe");
    return tramite;
  },
  getTramiteByUsuario: async (id) => {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) throw new Error("El usuario ingresado no existe");
    const tramites = await Tramite.findAll({
      where:{
        companyId: usuario.companyId
      },
      include:[{
        model:Documentos
      },{
        model:Listatramites
      },{
        model:Historial,
        include: [
          {
            model: Usuario
          }
        ]
      },{
        model:Usuario,
        include: [
          {
            model: Tramite,
            include:[{
              model:Listatramites
            }]
          },
        ]
      },]
    });
    if (!tramites) throw new Error("No hay ningún tramite en la base de datos");
    if(usuario.rol == 1){
      console.log(tramites)
      const tramitesFiltrados = tramites.filter(t => t.grupoGestion == usuario.grupoId && t.estado == 1)
      return tramitesFiltrados;
    }else{
      const tramitesFiltrados = tramites.filter(t => t.grupoGestion == usuario.grupoId && t.usuarioAsignado == usuario.id)
      return tramitesFiltrados;
    }
  },
  editTramite: async (data, id) => {
    const tramite = await Tramite.findByPk(id);
    if (!tramite) throw new Error("El tramite ingresado no existe");
    if(data.estado){
      console.log(data.estado, tramite.estado)
      if(data.estado == 2 && tramite.estado < 2){
        // REPARTIO
        await Historial.create({
          fecha: new Date(),
          accion:"El tramite fue repartido",
          tramiteId:id,
          observacion:data.observacion,
          usuarioId:data.usuarioHistorial
        })
      }
      else if(data.estado == 3 && tramite.estado < 3){
        // PROYECTÓ
        await Historial.create({
          fecha: new Date(),
          accion:"El tramite fue proyectado",
          tramiteId:id,
          observacion:data.observacion,
          usuarioId:data.usuarioHistorial
        })
      }
      else if(data.estado == 4 && tramite.estado < 4){
        // REVISÓ 
        await Historial.create({
          fecha: new Date(),
          accion:"El tramite fue revisado",
          tramiteId:id,
          observacion:data.observacion,
          usuarioId:data.usuarioHistorial
        })
      }
      else if(data.estado == 5 && tramite.estado < 5){
        // FIRMÓ
        await Historial.create({
          fecha: new Date(),
          accion:"El tramite fue firmado",
          tramiteId:id,
          observacion:data.observacion,
          usuarioId:data.usuarioHistorial
        })
      }
      else if(tramite.estado < data.estado){
        await Historial.create({
          fecha: new Date(),
          accion:"El tramite fue devuelto",
          tramiteId:id,
          observacion:data.observacion,
          usuarioId:data.usuarioHistorial
        })
      }
    }
    for (const key in data) {
      tramite[key] = data[key];
    }
    await tramite.save();
    return tramite;
  },
};
