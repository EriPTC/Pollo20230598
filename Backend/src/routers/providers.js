import express from "express";
import providersController from "../controller/providers.js"
//Usamos la libreria router de express por que tiene todos lo metodos get, post, put y delete
 
const router = express.Router()
 
router.route("/")
.get(providersController.getProviders)
.post(providersController.insertProviders)
 
router.route("/:id")
.put(providersController.updateProvider)
.delete(providersController.deleteProviderProvider)
 
export default router
