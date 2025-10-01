const mongo = require('mongodb');
const { MongoClient } = mongo;

const POOL_SIZE = 5;
let cachedDb = null;

let connectToDatabase = async (uri, dbName) => {
  if (cachedDb) return cachedDb;

  console.log("Connecting to MongoDB URI:", uri); // debug line

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: POOL_SIZE,
    writeConcern: { w: 'majority', wtimeout: 5000, j: true }, // removes deprecated warning
  });

  cachedDb = client.db(dbName);
  return cachedDb;
};

let getMongoIdForValue = (id) => new mongo.ObjectID(id);
let getMongoId = () => new mongo.ObjectID();

module.exports = {
  connectToDatabase,
  getMongoId,
  getMongoIdForValue,
};

