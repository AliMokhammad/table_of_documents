const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

let data = require("./data.json");
let documents1Ids = data.documents1.map((doc) => doc.id);
let documents2Ids = data.documents2.map((doc) => doc.id);
const port = Number(process.env.SERVER_PORT) || 23000;

const sendResponse = (data, msg = "NO MSG", success = true) => ({
  data,
  msg,
  success,
});

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("content-disposition : attachment");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  req.connection.setTimeout(30 * 60 * 1000); //waiting 30 mins api call response time out
  next();
});

app.use(express.static(`./build`));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/:type", async (req, res) => {
  const { type } = req.params;
  if (!["documents1", "documents2"].includes(type)) {
    res.json(sendResponse([], "WRONG ENDPOINT", false));
    return;
  }
  setTimeout(() => res.json(sendResponse(data[type])), 3000);
});

app.post("/cancel", async (req, res) => {
  const { ids } = req.body;
  console.log({ ids });
  setTimeout(() => res.json(sendResponse({}, "SUCCEESSFULY CANCELED")), 3000);
});

app.use("/", async (req, res) => {
  res.redirect("/documents");
});

app.listen(port, () => {
  console.log(`Server started on port`, port);
});
