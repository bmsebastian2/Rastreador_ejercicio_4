import express from "express";
const app = express();
import cors from "cors";
import * as url from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { AddNewUser, findUser } from "./schemanMongoo.mjs";

dotenv.config();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// PRUEBA DEL 1 AL 6///////////////////////////

app.get("/api/users", (req, res) => {
  // MATRIZ lista de todos los usuarios
  findUser().then((result) => {
    res.send(result);
  });
});

app.post("/api/users", (req, res) => {
  //crear un nuevo usuario
  let userName = req.body.username;
  AddNewUser(userName).then((resp) => res.json(resp));
});

////////////////////////////////////////////////

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
