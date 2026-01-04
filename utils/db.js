const mongoose = require("mongoose");

let cacheDb = null;

async function connectToDatabase() {
  try {
    if (cacheDb) return cacheDb;

    const uri = String(process.env.MONGODB_URI);
    const connection = await mongoose.connect(uri);

    cacheDb = connection.connection;
    return connection.connection;
  } catch (error) {
    throw new Error(`Não foi possível se conectar ao banco de dados. Erro: ${error}`);
  }
}

module.exports = connectToDatabase;
