import express from "express";
import ReviewsController from "../controller/reviews.js";
//Usamos la libreria router de express por que tiene todos lo metodos get, post, put y delete
 
const router = express.Router()
 
router.route("/")
.get(ReviewsController.getReviews)
.post(ReviewsController.insertReviews)
 
router.route("/:id")
.put(ReviewsController.updateReviews)
.delete(ReviewsController.deleteReviews)
 
export default router
