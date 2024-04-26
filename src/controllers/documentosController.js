const { Documentos, Usuario, Auditoria } = require("../db");

module.exports = {
  newDocumento: async (data,tramite,ip) => {
    const documento = await Documentos.create({
      size:(data.size/1000000).toFixed(1),
      file:data.originalname,
      path:data.path,
      fecha: new Date(),
      tramiteId: tramite
    });
    const auditoria = await Auditoria.create({
      ip,
      fecha: new Date(),
      accion:"Se subió  un documento"
    })
    return documento;
  },
  getDocumentos: async () => {
    const documentos = await Documentos.findAll();
    return documentos;
  },
  getDocumentoById: async (id) => {
    const documento = await Documentos.findByPk(id, {
      include: [
        {
          model: Usuario,
        },
      ],
    });
    if (!documento) throw new Error("El documento ingresado no existe");
    return documento;
  },
  getDocumentoByUsuario: async (id) => {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) throw new Error("El usuario ingresado no existe");
    const documentos = await Documentos.findAll();
    if (!documentos) throw new Error("No hay ningún documento en la base de datos");
    const documentosFiltrados = documentos.filter(t => t.grupoGestion == usuario.grupoId && t.usuarioAsignado == usuario.id)
    return documentosFiltrados;
  },
  editDocumento: async (data, id) => {
    const documento = await Documentos.findByPk(id);
    if (!documento) throw new Error("El documento ingresado no existe");
    for (const key in data) {
      documento[key] = data[key];
    }
    await documento.save();
    return documento;
  },
};
