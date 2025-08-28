# zipcode-api

A REST API designed to simplify the process of determining if a potential client is within a service area by calculating distances between Canadian postal codes.

Currently, this API supports **Canadian postal codes only**.

---

## Features

-   Get information about a specific Canadian postal code
-   Calculate the distance (in kilometers) between two Canadian postal codes
-   Normalizes postal codes (removes spaces, converts to uppercase)

---

## API Endpoints

### Get Zip Code Data

**GET** `/api/zipcanada/:id`

-   **Parameters**
    -   `id` (string) — Canadian postal code (e.g., `M5V1E3` or `M5V 1E3`)
-   **Response**

```json
{
	"POSTAL_CODE": "M5V 1E3",
	"CITY": "Toronto",
	"PROVINCE_ABBR": "ON",
	"LATITUDE": "43.6456",
	"LONGITUDE": "-79.3959"
}
```

---

### Get Distance Between Two Zip Codes

**GET** `/api/zipcanada/distance?zip1=XXX&zip2=YYY`

-   **Query Parameters**
    -   `zip1` (string) — First Canadian postal code
    -   `zip2` (string) — Second Canadian postal code
-   **Response**

```json
{
	"zip1": "M5V 1E3",
	"zip2": "K1A 0B1",
	"distance_km": 3400.5
}
```

---

## Installation

To set up the project locally:

### 1. Clone the repository

```bash
git clone <repo-url>
cd zipcode-api
```

### 2. Install Dependencies

Once you have cloned the repository, install the required Node.js packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:

-   `express` — for the REST API framework
-   `colors` — for backend logging

**Note:** Make sure you are running a supported version of Node.js (v20+ recommended).

### 3. Install Git LFS (if not already installed)

This project uses a large JSON file for Canadian postal codes, tracked with **Git LFS**. Make sure Git LFS is installed:

```bash
git lfs install
```

### 4. Pull the large JSON file via Git LFS

```bash
git lfs pull
```

This ensures the `data/canadian_postal_codes.json` file is downloaded correctly.

### 5. Verify Installation

After installation, your project directory should contain:

```
zipcode-api/
├─ data/
│  └─ canadian_postal_codes.json
├─ controllers/
├─ routes/
├─ middleware/
├─ package.json
├─ package-lock.json
└─ server.js
```

You are now ready to run the API.

---

## Running the API

### Development Mode (with auto-reload)

For development with automatic file watching and environment variable loading:

```bash
npm run dev
```

This runs: `node --watch --env-file=.env server`

### Production Mode

For regular production running:

```bash
npm start
```

The API will be available at `http://localhost:8000` (or the port specified in your `.env` file).
