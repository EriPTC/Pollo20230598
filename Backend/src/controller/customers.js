import CustomersModel from "../models/customers.js";

const CustomersController = {};

//select
CustomersController.getCustomer = async (req, res) => {
    try {
        const customers = await CustomersModel.find();
        return res.status(200).json(customers);
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//delete
CustomersController.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = await CustomersModel.findByIdAndDelete(
            req.params.id,
        );

        if (!deleteCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "internal server error" });
    }
};

//update

CustomersController.updateCustomer = async (req, res) => {
    try {
        let {
            name,
            lastname,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body;
        name = name?.trim();
        email = email?.trim();
        lastname = lastname?.trim();

        if (name.length < 3 || name.length > 15) {
            return res.status(400).json({ message: "name too short" });
        }

        if (birthdate > new Date() || birthdate < new Date("1900-01-01")) {
            return res.status(400).json({ message: "Invalid birthdate" });
        }

        const updateCustomer = await CustomersModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                lastname,
                birthdate,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut,
            },
            { new: true },
        );

        if (!updateCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({ message: "Customer updated" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export default CustomersController;
