import express from "express"
import { getAllDados } from "../controllers/controller.js"

const router = express.Router();


router.get("/get", getAllDados)

export {router}