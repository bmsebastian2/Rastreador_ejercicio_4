import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const uri =
  "mongodb://bmsebastian2:Ab15415958@ac-79zezp4-shard-00-00.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-01.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-02.fhwg3s0.mongodb.net:27017/?ssl=true&replicaSet=atlas-loit2h-shard-0&authSource=admin&retryWrites=true&w=majority";
await mongoose
  .connect(uri)
  .then((e) => console.log("EXITO CONEXION MONNGO"))
  .catch((err) => {
    console.log("ERROR CONEXION: ", err);
  });

const Objectschema = {
  user: {
    username: String,
    _id: String,
  },
  exerci: {
    username: String,
    description: String,
    duration: Number,
    date: Date,
    _id: String,
  },
  register: {
    username: String,
    count: Number,
    _id: String,
    log: [
      {
        description: String,
        duration: Number,
        date: Date,
      },
    ],
  },
};

function makeSchema(schemaModelo, name) {
  let esquemaURL;
  esquemaURL = new mongoose.Schema(schemaModelo);
  return mongoose.model(name, esquemaURL);
}
const Schema = {
  user: makeSchema(Objectschema.user, "users"),
  exerci: makeSchema(Objectschema.exerci, "exerci"),
  register: makeSchema(Objectschema.register, "register"),
};

export const AddNewUser = (username) => {
  const userNew = {
    username,
    _id: new ObjectId(),
  };
  const user = Schema.user(userNew);
  return new Promise((res, rej) => {
    try {
      user.save().then((e) => {
        console.log("USUARIO GUARDARO");
        res(userNew);
      });
    } catch (error) {
      console.log(err);
      rej(false);
    }
  });
};
export const findAllUsers = async () => await Schema.user.find();
export const findUserById = async (id) => await Schema.user.findById(id).exec();
export const findRegisterById = async (id) =>
  await Schema.register.findById(id).exec();

// export async function findRegister(id) {
//   await Schema.register.find({ _id: id }).then((data) => {
//     if (data.length > 0) {
//       console.log("si hay algo");
//     } else {
//       console.log("No hay nada");
//     }
//   });
// }

export function newRegister(_id, username, description, duration, date) {
  const newuRL = new Schema.register({
    username,
    count: 1,
    _id,
    log: [
      {
        description,
        duration,
        date,
      },
    ],
  });
  newuRL
    .save()
    .then((doc) => {
      console.log("guardado");
      console.log(doc);
    })
    .catch((err) => {
      console.error("error al guardar:" + err);
    });
}

export async function registerLog(register, newObject) {

  const { log, count } = register;
  let arrLog = log;
  arrLog.push(newObject);
  register.log = arrLog;
  register.count += 1;
  await register.save();
}
