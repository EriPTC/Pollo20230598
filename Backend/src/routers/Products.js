import express from "express";
import ProductsController from "../controller/ProductsController.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Router() ayuda a colocar los metodos que tienen los endpoints
const router = express.Router();

router.route("/")
.get(ProductsController.getProduct)
.post(ProductsController.InsertProduct)

router.route("/:id")
.put(ProductsController.UpdateProduct)
.delete(ProductsController.DeleteProduct)
export default router;