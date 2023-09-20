import { Schema } from "./schemanMongoo.mjs";
import { ObjectId } from "mongodb";
console.log("USER ACTIVO");

export const findAllUsers = () => Schema.user.find();
export const findUserById = (id) => Schema.user.findById(id);
export const AddNewUser = (username) =>
  Schema.user({ _id: new ObjectId(), username }).save();
