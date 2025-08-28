import { getPostalCode } from "../data/postalLookup.js"

// @desc    Get Zip Code Data
// @route   GET /api/zipcanada/:id
export const getZip = async (req, res, next) => {
	try {
		const inp = req.params.id
		const zip = await getPostalCode(inp)

		if (!zip) {
			const error = new Error(`The Zip Code ${inp} was not found`)
			error.status = 404
			return next(error)
		}

		res.status(200).json(zip)
	} catch (err) {
		next(err)
	}
}

// @desc    Calculate and return the distance (in kilometers) between two Canadian postal codes provided as query parameters
// @route   GET /api/zipcanada/distance?zip1=XXX&zip2=YYY
export const getZipDistance = async (req, res, next) => {
	try {
		const inp1 = req.query.zip1
		const inp2 = req.query.zip2

		const zip1 = await getPostalCode(inp1)
		const zip2 = await getPostalCode(inp2)

		if (!zip1 || !zip2) {
			const error = new Error(`Invalid Zip Codes: ${inp1}, ${inp2}`)
			error.status = 404
			return next(error)
		}

		const lat1 = parseFloat(zip1.latitude)
		const lon1 = parseFloat(zip1.longitude)
		const lat2 = parseFloat(zip2.latitude)
		const lon2 = parseFloat(zip2.longitude)

		const toRad = (deg) => (deg * Math.PI) / 180

		const dLat = toRad(lat2 - lat1)
		const dLon = toRad(lon2 - lon1)

		const lat1Rad = toRad(lat1)
		const lat2Rad = toRad(lat2)

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		const earthRadiusKm = 6371
		const distanceKm = Math.ceil(earthRadiusKm * c)

		res.status(200).json({
			zip1: zip1.postal_code,
			zip2: zip2.postal_code,
			distance_km: distanceKm,
		})
	} catch (err) {
		next(err)
	}
}
