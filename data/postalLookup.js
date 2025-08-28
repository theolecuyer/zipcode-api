import fs from "fs"
import path from "path"

// Read and parse the JSON file once at server startup
const filePath = path.resolve("./data/canadian_postal_codes.json")
const postalCodes = JSON.parse(fs.readFileSync(filePath, "utf-8"))

const postalLookup = {}

postalCodes.forEach((row) => {
	const code = row.POSTAL_CODE.toUpperCase().replace(/\s+/g, "")
	postalLookup[code] = row
})

export default postalLookup
