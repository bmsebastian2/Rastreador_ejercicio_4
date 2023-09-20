import { Schema } from "./schemanMongoo.mjs";

export const findRegisterById = (id) => Schema.register.findById(id);

export async function registerLog(register, newObject) {
  const { log } = register;
  let arrLog = log;
  arrLog.push(newObject);
  register.log = arrLog;
  register.count += 1;
  await register.save();
}

export function newRegister(exerci) {
  console.log("newregister2");

  const { description, duration, date, _id, username } = exerci;
  let newObject = { description, duration, date };
  findRegisterById(_id).then((result) => {
    if (result === null) {
      console.log("No existe Registro");
      const newuRL = new Schema.register({
        username,
        count: 1,
        _id,
        log: [newObject],
      });
      newuRL.save();
    } else {
      console.log("si existe registro");
      registerLog(result, newObject);
    }
  });
}
