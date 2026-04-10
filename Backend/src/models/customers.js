/*
    Campos:
    name
    lastname
    birthdate
    email
    password
    isVerified
    loginAttempts
    timeOut
*/

import { Schema, model } from "moongose";

const customersSchema = new Schema(
  {
    name: { type: String },
    lastname: { type: String },
    birthdate: { type: Date },
    email: { type: String },
    password: { type: String },
    isVerified: { type: Boolean },
    loginAttempts: { type: Number },
    timeOut: { type: Date },
  },
  {
    timestamps: true, //añade fecha y hora de creación y actualización automáticamente
    strict: false, //permite agregar campos que no están definidos en el esquema
  },
);

export default model("customers", customersSchema);
