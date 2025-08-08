import express from "express"
import { data } from "../data/sample.data.js"

const router = express.Router();


router.get("/get", (req, res) => res.json(data))

export {router}