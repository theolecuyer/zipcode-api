import sqlite3 from "sqlite3"
import path from "path"

// Path to your SQLite database file
const dbPath = path.resolve("./data/postal_codes.db")

// Open database in read-only mode
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
		console.error("Failed to open database:", err.message)
	} else {
		console.log("SQLite database connected")
	}
})

/**
 * Get postal code info by code
 * @param {string} code - Canadian postal code (e.g., "M5V1E3")
 * @returns {Promise<object>} - Resolves to the postal code row or null
 */
export function getPostalCode(code) {
	const normalizedCode = code.toUpperCase().replace(/\s+/g, "")
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM postal_codes WHERE postal_code = ?", [normalizedCode], (err, row) => {
			if (err) return reject(err)
			resolve(row || null)
		})
	})
}

export default db
