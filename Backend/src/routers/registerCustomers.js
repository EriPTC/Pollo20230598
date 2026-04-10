import express from "express"

import registerCustomers from "../controller/registerCustomers.js"

const router = express.Router()
router.route("/").post(registerCustomers.register)
router.route("/verifyCodeEmail").post(registerCustomers.verifyCode)

export default router; 