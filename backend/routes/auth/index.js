const express = require("express");
const { verifyUser } = require("../../middlewares/verifyUser");
const { getQuery } = require("../../database/query");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const { validateObjectValues } = require("../../Utils/Validate/validateObjectValues");

const router = express.Router();


router.get("/", verifyUser, (request, response) => {
	try {
		return response.status(200).json({Status: "Success", ...request.user});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});

router.get("/logout", verifyUser, (request, response) => {
	try {
		response.clearCookie("authToken")
		return response.json({Status: "Success", message: "Sesion Cerrada Correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}

})


router.post("/login", async (request, response) => {
	try {
		validateObjectValues(request.body);

		const { email, password } = request.body;

		const query = `
			SELECT
				u.Cedula_Usuario,
				u.Nombre,
				u.Apellidos,
				u.Correo,
				u.Contraseña,
				tu.ID_Tipo_Usuarios,
				tu.Nombre AS Tipo_Usuario
			FROM Usuarios u
			JOIN Tipo_Usuarios tu ON u.ID_Tipo_De_Usuario = tu.ID_Tipo_Usuarios

			WHERE u.Correo = '${email}'
		`;

		const dbUser = await getQuery(query);

		if (dbUser.length == 0) {
			return response.json({ Error: "El usuario no está registrado." });
		}

		const passStatus = await bcrypt.compare(String(password), dbUser[0].Contraseña);

		if(!passStatus) { return response.status(404).json({ Error: "La contraseña es incorrecta" }); }


		const user = dbUser[0];
		const token = jwt.sign({user: user}, `${process.env.LOGIN_TOKEN}`, {expiresIn: "1d"});

		response.cookie("authToken", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "none",
			secure: true
		});

		return response.json({ Status: "Success", message: "Sesión iniciada correctamente"});

	} catch (err) {
		return response.json({Error: err.message})
	}
});





module.exports = router;