var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");
/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", {});
});

router.get("/db", (req, res) => {
  let mongoU = req.query.mongo;
  mu.findDatabases(mongoU)
    .then(databases => res.render("databases", { "databases": databases.databases }));
});

router.get("/db/:dbName", (req, res) => {
  mu.findCollections(req.params.dbName)
    .then(collections => {
      res.json(collections);
    });
});

router.get("/db/:dbName/col/:colName", (req, res) => {
  mu.findRowsCol(req.params.dbName, req.params.colName)
    .then(collections => {
      res.json(collections);
    });
});

router.post("/db/:dbName/col/:colName", (req, res) => {
  mu.insertRow(req.params.dbName, req.params.colName, req.body)
    .then((dontcare) => mu.findRowsCol(req.params.dbName, req.params.colName))
    .then(collections => {
      res.json(collections);
    });
});


module.exports = router;
