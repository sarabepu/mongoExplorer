const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};
  let hostD="";
  mu.connect = () => {
    const client = new MongoClient(hostD, {
      useUnifiedTopology: true
    });
    return client.connect();
  };


  mu.findDatabases = (host) => {
    hostD=host;
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

  mu.findRowsCol= (dbName,colName,number) =>
  
    mu.connect().then( client =>
    {
      const col = client.db(dbName).collection(colName);

      return col
        .find()
        .sort({ $natural: -1 })
        .limit(parseInt(number))
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
