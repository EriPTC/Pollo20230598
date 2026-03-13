/*
    Campos:
    - name: String
    - adress: String
    - schedule: String
    - isActive: String
*/

import { Schema, model } from "mongoose";

const BranchesSchema = new Schema({
    name: {
        type: String,
    },
    adress: {
        type: String,
    },
    schedule: {
        type: String,
    },
    isActive: {
        type: String,
    }
},
    {
        timestamps: true, //añade fecha y hora de creación y actualización automáticamente
        strict: false //permite agregar campos que no están definidos en el esquema
    }
);

export default model("Branches", BranchesSchema);
