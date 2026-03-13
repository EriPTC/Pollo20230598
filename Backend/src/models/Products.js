/*
    Campos:
    - name: String
    - description: String
    - price: Number
    - stock: Number
*/

import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    }
},
    {
        timestamps: true, //añade fecha y hora de creación y actualización automáticamente
        strict: false //permite agregar campos que no están definidos en el esquema
    }
);

export default model("Product", productSchema);

