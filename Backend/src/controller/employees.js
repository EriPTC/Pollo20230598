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
    const {   name, lastName ,salary, DUI, phone, email, password, idBranch, isVerified} = req.body
    // Lleno mi modelo con esos datos
 try {
    const existEmployee = await employeeModel.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ message: "Employee already exist" });
    }

    //encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //guardar en base de datos
    const newEmployee = new employeeModel({
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password: passwordHash,
      idBranch,
      isVerified
    });

    await newEmployee.save();

    //generar codigo aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex"); //.toString("hex") agrega letras en este caso, 3 num y 3 letras

    //generar token para guardar verificationCode
    const tokenCode = jsonwebtoken.sign(
      // paso 1: que vamos a guardar
      { email, verificationCode },
      // paso 2: secret key
      config.JWT.secret,
      //paso 3: cuando expira
      { expiresIn: "15m" },
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 15*60*1000 }); //el numero que se cambia es el 15

    //enviar el cod por correo
    const transporte = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    }); //transporte es quien manda el correo

    //mailOptions es quien lo recibe
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este codigo: " +
        verificationCode +
        " expria en 15 minutos",
    };

    //enviar
    transporte.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        return res.status(400).json({ message: "error" });
      }
      res
        .status(200)
        .json({ message: "Employee registered, verify your email" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
}
 
//ACTUALIZAR
employeeController.updateEmployee = async (req, res) =>
{
    // Solicitmamos datos
    const {   name, lastName ,salary, DUI, phone, email, password, idBranch} = req.body
 
    await employeeModel.findByIdAndUpdate(req.params.id,{name, lastName ,salary, DUI, phone, email, password, idBranch, isVerified},{new: true});
 
    res.json({message: "Employee  updated"})
}
 
//DELETE
employeeController.deleteEmployee = async (req, params) =>
{
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Employee deleted"})
}
 
export default employeeController;