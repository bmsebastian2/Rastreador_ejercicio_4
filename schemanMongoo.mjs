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
    date: String,
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
        date: String,
      },
    ],
  },
};

function makeSchema(schemaModelo, name) {
  let esquemaURL;
  esquemaURL = new mongoose.Schema(schemaModelo, { versionKey: false });
  return mongoose.model(name, esquemaURL);
}
export const Schema = {
  user: makeSchema(Objectschema.user, "users"),
  exerci: makeSchema(Objectschema.exerci, "exerci"),
  register: makeSchema(Objectschema.register, "register"),
};



