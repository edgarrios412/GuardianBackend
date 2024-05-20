const { Documentos, Usuario, Auditoria, Tramite } = require("../db");
const path = require("path");
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
const { PDFNet } = require("@pdftron/pdfnet-node");
const { convertWordFiles } = require("convert-multiple-files");
libre.convertAsync = require("util").promisify(libre.convert);

PDFNet.runWithCleanup(() => {},
"demo:1714514682428:7fff3847030000000086d2920c9fcfbfd42e8e5e2f9b40c56789aa3359");

module.exports = {
  newDocumento: async (data, tramite, ip, companyId) => {
    const documento = await Documentos.create({
      size: (data.size / 1000000).toFixed(1),
      file: data.originalname,
      path: data.path,
      fecha: new Date(),
      tramiteId: tramite,
      companyId: companyId
    });
    const auditoria = await Auditoria.create({
      ip,
      companyId:companyId,
      fecha: new Date(),
      accion: "Se subió  un documento",
    });
    return documento;
  },
  uploadFile: async (data, ip) => {
    const documento = await Documentos.create({
      size: (data.size / 1000000).toFixed(1),
      file: data.originalname,
      path: data.path,
      fecha: new Date(),
      tramiteId: null,
      companyId: companyId
    });
    const auditoria = await Auditoria.create({
      ip,
      companyId:companyId,
      fecha: new Date(),
      accion: "Se subió  un documento",
    });
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
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("El usuario ingresado no existe");
    const documentos = await Documentos.findAll();
    if (!documentos)
      throw new Error("No hay ningún documento en la base de datos");
    const documentosFiltrados = documentos.filter(
      (t) =>
        t.grupoGestion == usuario.grupoId && t.usuarioAsignado == usuario.id
    );
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
  wordToPdf: async (filenames,tramiteId) => {
    const result = await convertWordFiles(`uploads/${filenames}`, "pdf", `uploads/`);
    const tramite = await Tramite.findByPk(tramiteId)
    console.log(tramite)
    if(!tramite) return;
    tramite.documento = result
    tramite.save()
    return result
  },
};
