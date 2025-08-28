import express from "express"
import zip from "./routes/zipcanada.js"
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/error.js"
import notFound from "./middleware/notfound.js"
const app = express()

const port = process.env.PORT || 8000

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logger middleware
app.use(logger)

// Routes
app.use("/api/zipcanada", zip)

// Error handle route not found
app.use(notFound)

// Error Handle middleware
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))
