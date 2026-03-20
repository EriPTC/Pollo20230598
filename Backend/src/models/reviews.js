/*
    Campos:
    idEmployees: id
    idProducts: id
    rating: Number,
    comment: String,
    
*/

import mongoose, { Schema,Types,model } from "mongoose";

const reviewSchema = new Schema({
    idEmployees:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    idProducts:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    }
},
    {
        timestamps: true, //añade fecha y hora de creación y actualización automáticamente
        strict: false //permite agregar campos que no están definidos en el esquema
    }
);

export default model("reviews", reviewSchema);

