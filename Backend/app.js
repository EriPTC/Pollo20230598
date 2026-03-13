import express from "express";
import ProductsRoutes from "./ src/models/Products.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Ejecutar express
const app = express();
export default app; 


//Acepte Json desde Postman
app.use(express.json());

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Endopoint y usar los metodos de productos
app.use("/api/products", ProductsRoutes);
