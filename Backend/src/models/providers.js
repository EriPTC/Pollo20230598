/*
    Campos:
    name, birthday, heigth, DUI, phone
*/

import { Schema, model } from "mongoose";

const providersSchema = new Schema({
    name: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    heigth: {
        type: Number,
    },
    DUI: {
        type: String,
    },
    phone: {
        type: String,
    }
},
    {
        timestamps: true, //añade fecha y hora de creación y actualización automáticamente
        strict: false //permite agregar campos que no están definidos en el esquema
    }
);

export default model("providers", providersSchema);

