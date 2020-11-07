const aggregationService = require("./aggregation.service").service;
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.contentType("application/json");
  res.status(200);
  const countByViewer = aggregationService.getCount();
  res.send(JSON.stringify(countByViewer));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
