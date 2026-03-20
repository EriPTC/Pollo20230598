//Creamos array de funciones
const employeeController = {};
 
// Import del modelo que vamos a utilizar
import employeeModel from "../models/employees.js"
 
//SELECT
employeeController.getEmployees = async (req,res) => {
    const employees = await employeeModel.find()
    res.json(employees)
}
 
//INSERT
employeeController.insertEmployees = async (req,res) =>
{
    // Solicitmamos datos
    const {   name, lastName ,salary, DUI, phone, email, password, idBranch} = req.body
    // Lleno mi modelo con esos datos
    const newEmployee = new employeeModel({   name, lastName ,salary, DUI, phone, email, password, idBranch})
    // Guardamos todo en la base de datos
    await newEmployee.save();
 
    res.json({message: "Employee saved"})
}
 
//ACTUALIZAR
employeeController.updateEmployee = async (req, res) =>
{
    // Solicitmamos datos
    const {   name, lastName ,salary, DUI, phone, email, password, idBranch} = req.body
 
    await employeeModel.findByIdAndUpdate(req.params.id,{name, lastName ,salary, DUI, phone, email, password, idBranch},{new: true});
 
    res.json({message: "Employee  updated"})
}
 
//DELETE
employeeController.deleteEmployee = async (req, params) =>
{
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Employee deleted"})
}
 
export default employeeController;