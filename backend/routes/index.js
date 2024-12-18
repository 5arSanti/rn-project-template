const express = require("express");



const authRouter = require("./auth")

const versionRouter = require("./version/index.js");


const routerApi = (app) => {
	const router = express.Router();
	app.use(`/${process.env.API_STRUCTURE}/v1`, router);

	// Routes
	router.use("/auth", authRouter);

	router.use("/version", versionRouter);

}

module.exports = routerApi;