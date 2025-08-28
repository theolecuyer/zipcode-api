import express from "express"
import { getZip } from "../controllers/zipcontroller.js"
const router = express.Router()

//Get Zip code data
router.get("/", getZip)

export default router
