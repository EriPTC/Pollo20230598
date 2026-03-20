import express from "express";
import employeeController from "../controller/employees.js";
//Usamos la libreria router de express por que tiene todos lo metodos get, post, put y delete
 
const router = express.Router()
 
router.route("/")
.get(employeeController.getEmployees)
.post(employeeController.insertEmployees)
 
router.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee)
 
export default router
