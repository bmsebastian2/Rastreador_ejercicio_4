import { Schema } from "./schemanMongoo.mjs";

export const findAllExercis = () => Schema.exerci.find();
export const findExercisById = (id) => Schema.exerci.findById(id);

export const AddNewExcercis = (user, objectExcercis, fecha, id) => {
  const { description, duration } = objectExcercis;
  const { _id, username } = user;

  const filter = { _id: id };
  const update = {
    _id,
    username,
    date: fecha,
    duration,
    description,
  };
  return Schema.exerci.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });
};
//Lo busca si lo encuentra lo actualiza sino lo agrega
