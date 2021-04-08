const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://USERNAME:PASSWORD@testcluster.trcnp.mongodb.net/DATABASE?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'testidb';
// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.debug('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});