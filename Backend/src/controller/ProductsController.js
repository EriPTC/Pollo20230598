//Array de metodos para el controlador de productos
const ProductsController = {};

//importo el schema de productos para usarlo en el controlador
import ProductsModel from "../models/Products.js";

//--------------------------------------------------------Metodo para obtener un producto--------------------------------------------------------//

//Select-Get
ProductsController.getProduct = async (req, res) => {
    const products = await ProductsModel.find();
    res.json(products);
};

//Insert-Post
ProductsController.InsertProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const newProduct = new ProductsModel({ name, description, price, stock });
    await newProduct.save();
    res.json({ message: "Product save" });
};

//Update-Put
ProductsController.UpdateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    await ProductsModel.findByIdAndUpdate(req.params.id,
        { name, description, price, stock },
        { new: true }
    );
    res.json({ message: "Product updated" });
};

//Delete
ProductsController.DeleteProduct = async (req, res) => {
    await ProductsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};


export default ProductsController;