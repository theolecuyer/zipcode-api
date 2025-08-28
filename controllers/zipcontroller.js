import postalLookup from "../data/postalLookup.js"

// @desc    Get Zip Code Data
// @route   GET /api/zip
export const getZip = (req, res, next) => {
	const inp = req.params.id.toUpperCase().replace(/\s+/g, "")
	console.log(inp)

	const zip = postalLookup[inp]
	console.log(zip)
	if (!zip) {
		const error = new Error(`The Zipode ${id} was not found`)
		error.status = 404
		return next(error)
	}
	res.status(200).json("hello")
}
