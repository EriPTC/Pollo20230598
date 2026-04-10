import express from "express";
import customers from "../controller/customers.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Router() ayuda a colocar los metodos que tienen los endpoints
const router = express.Router();

router.route("/")
.get(customers.getCustomer)

router.route("/:id")
.put(customers.updateCustomer)
.delete(customers.deleteCustomer)
export default router;