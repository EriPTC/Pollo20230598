//Array de metodos para el controlador de Branches
const BranchesController = {};

//importo el schema de Branches para usarlo en el controlador
import BranchesModel from "../models/branches.js";

//--------------------------------------------------------Metodo para obtener un Brancheso--------------------------------------------------------//

//Select-Get
BranchesController.getBranches = async (req, res) => {
    const Branches = await BranchesModel.find();
    res.json(Branches);
};

//Insert-Post
BranchesController.InsertBranches = async (req, res) => {
    const { name, adress, schedule, isActive } = req.body;
    const newBranches = new BranchesModel({ name, adress, schedule, isActive });
    await newBranches.save();
    res.json({ message: "Branches save" });
};

//Update-Put
BranchesController.UpdateBranches = async (req, res) => {
    const { name, adress, schedule, isActive } = req.body;
    await BranchesModel.findByIdAndUpdate(req.params.id,
        { name, adress, schedule, isActive },
        { new: true }
    );
    res.json({ message: "Branches updated" });
};

//Delete
BranchesController.DeleteBranches = async (req, res) => {
    await BranchesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Branches deleted" });
};


export default BranchesController;