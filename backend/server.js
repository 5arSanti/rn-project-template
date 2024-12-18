const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const routerApi = require("./routes");

const app = express();

const whiteList = [
    // Local
	"http://localhost:5173",

    // DEV Y QA

	// PROD
	"https://5arsanti.github.io"
];

const options = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
		  	callback(null, true)
		} else {
		  	callback(new Error("Acceso denegado, CORS Error"));
		}
	},
	methods: ["POST", "GET", "DELETE", "PATCH", "OPTIONS"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"]
}

app.use(cors(options));

app.options("*", cors(options));

app.use(express.json());
app.use(cookieParser());


app.get("/", (request, response) => {
	try {
		return response.status(200).json({Status: "Success", message: "API Running"});
	} catch (err) {
		return response.status(500).json({Error: err.message});
	}
})

routerApi(app);


module.exports = app;