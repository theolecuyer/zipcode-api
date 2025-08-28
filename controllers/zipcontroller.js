import postalLookup from "../data/postalLookup.js"

// @desc    Get Zip Code Data
// @route   GET /api/zipcanada/:id
export const getZip = (req, res, next) => {
	const inp = req.params.id.toUpperCase().replace(/\s+/g, "")

	const zip = postalLookup[inp]
	if (!zip) {
		const error = new Error(`The Zipode ${inp} was not found`)
		error.status = 404
		return next(error)
	}
	res.status(200).json(zip)
}

// @desc    Calculate and return the distance (in kilometers) between two Canadian postal codes provided as query parameters
// @route   GET /api/zipcanada/distance?zip1=XXX&zip2=YYY
export const getZipDistance = (req, res, next) => {
	const inp1 = req.query.zip1.toUpperCase().replace(/\s+/g, "")
	const inp2 = req.query.zip2.toUpperCase().replace(/\s+/g, "")

	const zip1 = postalLookup[inp1]
	const zip2 = postalLookup[inp2]
	if (!zip1 || !zip2) {
		const error = new Error(`Invalid Zip Codes in ${zip1}, ${zip2}`)
		error.status = 404
		return next(error)
	}

	const lat1 = parseFloat(zip1.LATITUDE)
	const lon1 = parseFloat(zip1.LONGITUDE)
	const lat2 = parseFloat(zip2.LATITUDE)
	const lon2 = parseFloat(zip2.LONGITUDE)

	const latDiff = (lat2 - lat1) * (Math.PI / 180)
	const lonDiff = (lon2 - lon1) * (Math.PI / 180)

	const lat1Rad = lat1 * (Math.PI / 180)
	const lat2Rad = lat2 * (Math.PI / 180)

	const a =
		Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	const earthRadiusKm = 6371
	const distanceKm = earthRadiusKm * c

	res.status(200).json({
		zip1: zip1.POSTAL_CODE,
		zip2: zip2.POSTAL_CODE,
		distance_km: distanceKm,
	})
}
