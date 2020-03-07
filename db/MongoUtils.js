const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    host = process.env.hostdb;
  mu.connect = () => {
    const client = new MongoClient(host, {
      useUnifiedTopology: true
    });
    return client.connect();
  };


  mu.findDatabases = () => {
    return mu.connect()
      .then(client => {
        return client
          .db()
          .admin()
          .listDatabases()
          .finally(()=>client.close());
      });
  };


  mu.findCollections= (dbName)=>
    
    mu.connect().then( client =>
    {
      const db=client.db(dbName);

      return db
        .listCollections()
        .toArray()
        .finally(() => client.close());
    }
    );

  mu.findRowsCol= (dbName,colName) =>
  
    mu.connect().then( client =>
    {
      const col = client.db(dbName).collection(colName);

      return col
        .find()
        .sort({ $natural: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    }
    );
  

  mu.insertRow = (dbName,colName,body) =>
    mu.connect().then(client => {
      const col = client.db(dbName).collection(colName);

      return col.insertOne(body).finally(() => client.close());
    });
  return mu;
}

module.exports = MongoUtils();
