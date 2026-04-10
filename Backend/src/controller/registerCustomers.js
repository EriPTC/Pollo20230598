import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import CustomersModel from "../models/customers.js";
import { config } from "../../config.js";

const registerCustomers = {};

registerCustomers.register = async (req, res) => {
  const {
    name,
    lastname,
    birthdate,
    email,
    password,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body;

  try {
    const existCustomer = await CustomersModel.findOne({ email });
    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exist" });
    }

    //encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //guardar en base de datos
    const newCustomer = new CustomersModel({
      name,
      lastname,
      birthdate,
      email,
      password: passwordHash,
      isVerified,
      loginAttempts,
      timeOut,
    });

    await newCustomer.save();

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
        .json({ message: "Customer registered, verify your email" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//verificar correo
registerCustomers.verifyCode = async (req, res) => {
  try {
    //solicitamos el cod ingresado en el front
    const { verificationCodeRequest } = req.body;

    //obtener el token de las cookies
    const token = req.cookies.verificationToken;

    //ver que cod esa en el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    //comparar verificationCodeRequest con el codifo del token
    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    //codigo correcto
    const Customer = await CustomersModel.findOne({ email });
    Customer.isVerified = true;
    await Customer.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default registerCustomers
