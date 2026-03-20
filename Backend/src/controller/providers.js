const providersController = {};

import providersModel from "../models/providers.js";

providersController.getProviders = async (req, res) => {
  try {
    const providers = await providersModel.find();
    return res.status(200).json(providers);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Served Error" });
  }
};








providersController.insertProviders = async (req, res) => {
  try {
    let {name, birthay, heigth, DUI, phone} = req.body;

    //sanitizar/borra espacio
    name = name?.trim();
    DUI = DUI?.trim();
    phone = phone?.trim();

    //Campos requeridos
    if (!name || !DUI || !phone) {
      return res.status(400).json({ message: "Field requerid" });
    }

    //tamaño campos
    if (name.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (DUI.length > 10 || DUI.length < 9) {
      return res.status(400).json({ message: "DUI not valid" });
    }

    //validar fecha

    if (
      birthay > new Date() || birthay < new Date("1908-01-01")
    ) {
      return res.status(400).json({ message: "Birthday not valid" });
    }

    // Validacion Altura
    if (Number(heigth) > 270) {
      return res.status(400).json({ message: "Heigth not valid" });
    }

    const newProvider = new providersModel({
      name,
      birthay,
      heigth,
      DUI,
      phone,
    });

    await newProvider.save();
    return res.status(201).json({ message: "Provider saved" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Served Error" });
  }
};









providersController.updateProvider = async (req, res) => {
  try {
    let { name, birthay, heigth, DUI, phone } = req.body;
    name = name?.trim();
    DUI = DUI?.trim();
    phone = phone?.trim();

    //tamaño campos
    if (name.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (DUI.length > 10 || DUI.length < 9) {
      return res.status(400).json({ message: "DUI not valid" });
    }

    //validar fecha

    if (
      birthay.length > new Date() ||
      birthay.length < new Date("1908-01-01")
    ) {
      return res.status(400).json({ message: "Birthday not valid" });
    }

    // Validacion Altura
    if (Number(heigth) > 270) {
      return res.status(400).json({ message: "Heigth not valid" });
    }

    const providerUpdate = await providersModel.findByIdAndUpdate(
      {
        name,
        birthay,
        heigth,
        DUI,
        phone,
      },
      { new: true },
    );

    if (!providerUpdate) {
      return res.status(404).json({ message: "Provider not found" });
    }

    return res.status(201).json({ message: "Provider saved" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Served Error" });
  }
};









providersController.deleteProviderProvider = async (req, res) => {
  try {
    const deleteProvider = await providersModel.findByIdAndDelete(
      req.params.id,
    );

    if (!deleteProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    return res.status(200).json({ message: "Provider Deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Served Error" });
  }
};


export default providersController;