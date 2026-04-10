import express from "express";
import customers from "../controller/customers.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Router() ayuda a colocar los metodos que tienen los endpoints
const router = express.Router();

router.route("/")
.get(customers.getcustomer)

router.route("/:id")
.put(customers.Updatecustomer)
.delete(customers.Deletecustomer)
export default router;