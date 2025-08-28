import express from "express"
import { getZip, getZipDistance } from "../controllers/zipcontroller.js"
const router = express.Router()

// Get Zip code distance
router.get("/distance", getZipDistance)

// Get Zip code data
router.get("/:id", getZip)

export default router
