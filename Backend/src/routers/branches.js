import express from "express";
import Branches from "../controller/branches.js";

///----------------///----------------///----------------///----------------///----------------///----------------///----------------///


//Router() ayuda a colocar los metodos que tienen los endpoints
const router = express.Router();

router.route("/")
.get(Branches.getBranches)
.post(Branches.InsertBranches)

router.route("/:id")
.put(Branches.UpdateBranches)
.delete(Branches.DeleteBranches)
export default router;