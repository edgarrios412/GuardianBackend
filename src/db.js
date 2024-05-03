require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB} = process.env;

const sequelize = new Sequelize(DB, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {}, //removed ssl
  });

  const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Usuario, Tramite, Grupo, Documentos, Historial, Reporte} = sequelize.models;

Tramite.addHook('beforeCreate', async (tramite, options) => {
  // Obtén el último valor de numeroRadicado
  const ultimoRegistro = await Tramite.findOne({
     order: [['numeroRadicado', 'DESC']]
  });
 
  if (ultimoRegistro) {
     // Incrementa el valor en 1
     const nuevoValor = parseInt(ultimoRegistro.numeroRadicado) + 1;
     tramite.numeroRadicado = nuevoValor.toString();
  }
 });

 Grupo.hasMany(Usuario);
 Usuario.belongsTo(Grupo)

 Tramite.hasMany(Documentos);
 Documentos.belongsTo(Tramite);

 Tramite.hasMany(Historial);
 Historial.belongsTo(Tramite);

 Usuario.hasMany(Historial)
 Historial.belongsTo(Usuario)

 Usuario.hasMany(Tramite);
 Tramite.belongsTo(Usuario);

 Usuario.hasMany(Reporte);
 Reporte.belongsTo(Usuario);

  module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  };