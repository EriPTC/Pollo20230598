import express from "express";
import ProductsRoutes from "./src/routers/Products.js"; 
import branchesRoutes from "./src/routers/branches.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Ejecutar express
const app = express();
export default app; 


//Acepte Json desde Postman
app.use(express.json());

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Endopoint y usar los metodos de productos
app.use("/api/products", ProductsRoutes);

//Endopoint y usar los metodos de branches
app.use("/api/branches", branchesRoutes);

