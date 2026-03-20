//Creamos array de funciones
const reviewsController= {};
 
// Import del modelo que vamos a utilizar
import reviewsModel from "../models/reviews.js"
 
//SELECT
reviewsController.getReviews = async (req,res) => {
    const Reviews = await reviewsModel.find()
    res.json(Reviews)
}
 
//INSERT
reviewsController.insertReviews = async (req,res) =>
{
    // Solicitmamos datos
    const {idEmployees, idProducts, rating, comment} = req.body
    // Lleno mi modelo con esos datos
    const newReviews = new reviewsModel({idEmployees, idProducts, rating, comment})
    // Guardamos todo en la base de datos
    await newReviews.save();
 
    res.json({message: "Reviews saved"})
}
 
//ACTUALIZAR
reviewsController.updateReviews = async (req, res) =>
{
    // Solicitmamos datos
    const {idEmployees, idProducts, rating, comment} = req.body
 
    await reviewsModel.findByIdAndUpdate(req.params.id,{idEmployees, idProducts, rating, comment},{new: true});
 
    res.json({message: "Reviews  updated"})
}
 
//DELETE
reviewsController.deleteReviews = async (req, params) =>
{
    await reviewsModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Reviews deleted"})
}
 
export default reviewsController;