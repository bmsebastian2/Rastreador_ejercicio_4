import express from "express";
const app = express();
import cors from "cors";
import * as url from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { findAllUsers, AddNewUser, findUserById } from "./userMongo.mjs";
import { AddNewExcercis } from "./exerciseMongo.mjs";
import { newRegister, findRegisterById } from "./registerMongoose.mjs";
//import { resolve } from "path";

dotenv.config();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", (req, res) => {
  findAllUsers().then((result) => {
    res.send(result);
  });
});

app.post("/api/users", (req, res) => {
  let userName = req.body.username;
  AddNewUser(userName).then((resp) => res.json(resp));
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const { body } = req;
  const fecha = formatoFecha(body.date);
  if (body._id) {
    const user = await findUserById(body._id);
    if (user) {
      const exerci = await AddNewExcercis(user, body, fecha, body._id);
      newRegister(exerci);
      res.json(exerci);
    } else {
      res.send("_ID de usuario no existe");
    }
  }
});

app.get("/api/users/:_id/logs", (req, res) => {
  const { _id } = req.params;

  findRegisterById(_id).then((register) => {
    if (register === null) {
      res.send("_ID no se encuentra");
    } else {
      res.json(register);
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function formatoFecha(date) {
  return (date ? new Date(`${date}T00:00:00`) : new Date()).toDateString();
}

// import {
//   AddNewUser,
//   findUserById,
//   findRegisterById,
//   newRegister,
//   registerLog,
// } from "./schemanMongoo.mjs";
// import { now } from "mongoose";

//   const fecha = formatoFecha(date);
//   findUserById(_id).then((user) => {
//     if (user === null) {
//       res.send("_ID de usuario no existe");
//     } else {
//       findRegisterById(_id).then((register) => {
//         const { _id, username } = user;
//         if (register === null) {
//           newRegister(_id, username, description, duration, fecha);
//         } else {
//           let newObject = { description, duration, date: fecha };
//           registerLog(register, newObject);
//         }
//         res.json({
//           _id,
//           username,
//           date: fecha,
//           duration: Number.parseInt(duration),
//           description,
//         });
//       });
//     }
//   });
