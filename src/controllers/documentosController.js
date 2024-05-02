const { Documentos, Usuario, Auditoria } = require("../db");
const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
const { PDFNet } = require("@pdftron/pdfnet-node");
libre.convertAsync = require('util').promisify(libre.convert);

PDFNet.runWithCleanup(() =>{}, "demo:1714514682428:7fff3847030000000086d2920c9fcfbfd42e8e5e2f9b40c56789aa3359")

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
  wordToPdf:async (data) => {
    const filename = "example.doc";
  let ext = path.parse(filename).ext;

  const inputPath = path.resolve("uploads/", filename);
  const outputPath = path.resolve("uploads/", `${filename}.pdf`);

  if (ext === '.pdf') {
    res.statusCode = 500;
    res.end(`File is already PDF.`);
  }

  const main = async () => {
    const pdfdoc = await PDFNet.PDFDoc.create();
    await pdfdoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfdoc, inputPath);
    pdfdoc.save(
      `uploads/${filename}.pdf`,
      PDFNet.SDFDoc.SaveOptions.e_linearized,
    );
    ext = '.pdf';
  };

  const PDFNetEndpoint = (main, pathname) => {
    PDFNet.runWithCleanup(main)
    .then(() => {
      PDFNet.shutdown();
      fs.readFile(pathname, (err, data) => {
        if (err) {
          // res.statusCode = 500;
          // res.end(`Error getting the file: ${err}.`);
        } else {
          // const ext = path.parse(pathname).ext;
          // res.setHeader('Content-type', mimeType[ext] || 'text/plain');
          console.log(data)
          return data
        }
      });
    })
    .catch((error) => {
      // res.statusCode = 500;
      // res.end(error);
    });
};
  PDFNetEndpoint(main, outputPath);
    return `uploads/${filename}.pdf`;
  },
};
