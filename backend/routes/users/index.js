const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { getQuery } = require("../../database/query");
const { connection } = require("../../database");

const { validateObjectValues } = require("../../Utils/Validate/validateObjectValues");
const { validatePassword } = require("../../Utils/Validate/validatePassword");
const { verifyUser } = require("../../middlewares/verifyUser");
const { verifyAdmin } = require("../../middlewares/verifyAdmin");
const { compressImage } = require("../../Utils/Images/compressImage");


router.get("/", verifyUser, verifyAdmin, async (request, response) => {
	try {
		const query = `
			SELECT
				u.Cedula_Usuario,
				u.Nombre,
				u.Apellidos,
				u.Correo,
				tu.Nombre AS 'Tipo de usuario'

			FROM Usuarios u
			JOIN Tipo_Usuarios tu ON u.ID_Tipo_De_Usuario = tu.ID_Tipo_Usuarios
		`;

		const users = await getQuery(query)

		return response.json({users: users})
	}
	catch (err) {
		return response.json({Error: err.message})
	}
});


router.delete("/", verifyUser, verifyAdmin, async (request, response) => {
	try {
		const cedulaUsuario = request.body.id;

		const query = `DELETE FROM Usuarios WHERE Cedula_Usuario = ${cedulaUsuario}`;

		connection.query(query, (err) => {
			if(err) {
				return response.status(500).json({ Error: err.message });
			}

			return response.json({ Status: "Success", message: "Usuario eliminado correctamente" });
		});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});


const salt = 10;
router.patch("/", verifyUser, verifyAdmin, async (request, response) => {
	try {
		const id = request.body.id;

		validateObjectValues(request.body);
		validatePassword(request.body.password, request.body.confirmPassword)

		const query = `
			UPDATE login
			SET name=?, email=?, password=?
			WHERE id = ?
		`;

		bcrypt.hash(request.body.password.toString(), salt, (err, hash) => {
			if (err) { return response.json({Error: "Error hashing password"}); }

			const values = [
				request.body.name,
				request.body.email,
				hash,
				id,
			]

			connection.query(query, [...values], (err) => {
				if(err) { return response.json({Error: "Error editando el usuario"}) }

				return response.json({Status: "Success", message: "Usuario editado correctamente"});
			});
		});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});


router.get("/:Cedula_Usuario", verifyUser, async (request, response) => {
	const { Cedula_Usuario } = request.params;

	try {
		const query = `
			SELECT
				u.Cedula_Usuario,
				u.Nombre,
				u.Apellidos,
				u.Correo,
				u.Contraseña,
				u.Imagen,
				tu.ID_Tipo_Usuarios,
				tu.Nombre AS Tipo_Usuario,
				g.ID_Genero,
				g.Genero

			FROM Usuarios u
			JOIN Tipo_Usuarios tu ON u.ID_Tipo_De_Usuario = tu.ID_Tipo_Usuarios
			JOIN Generos g ON u.ID_Genero = g.ID_Genero

			WHERE u.Cedula_Usuario = ${Cedula_Usuario}
		`;

		const user = await getQuery(query)

		return response.json({userInfo: {
			...user[0],
			Imagen: user.Imagen ? user[0].Imagen.toString("base64") : null,
		}})
	}
	catch (err) {
		return response.json({Error: err.message})
	}
});

router.get("/types", verifyUser, verifyAdmin, async (request, response) => {
	try {
		const userTypes = await getQuery(`
			SELECT
				ID_Tipo_Usuarios AS id,
				Nombre AS name
			FROM Tipo_Usuarios
		`);

		return response.status(200).json({userTypes: userTypes})
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})


router.post("/new", async (request, response) => {
	try {
		validateObjectValues(request.body);

		const {
			Cedula_Usuario,
			Nombre,
			Apellidos,
			Correo,
			Contraseña,
			Confirmar_Contraseña,
			Imagen,
			ID_Genero,
		} = request.body;

		validatePassword(Contraseña, Confirmar_Contraseña);

		const dbUser = await getQuery(`SELECT * FROM Usuarios WHERE Cedula_Usuario = ${Cedula_Usuario} OR Correo = '${Correo}'`);

		if(dbUser.length !== 0) { return response.json({Error: "El usuario con este numero de cedula o correo ya esta registrado"}); }

		const hash = await bcrypt.hash(String(Contraseña), salt);

		const compressedImage = await compressImage(Imagen);

		const query = `
			INSERT INTO Usuarios (Cedula_Usuario, Nombre, Apellidos, Correo, Contraseña, Imagen, ID_Genero)
			VALUES
			(${Cedula_Usuario},'${Nombre}', '${Apellidos}', '${Correo}', '${hash}', 0x${compressedImage}, ${ID_Genero})
		`;

		await getQuery(query);

		return response.json({Status: "Success", message: "Usuario creado correctamente"});
	}
	catch (err) {
		return response.json({Error: err.message})
	}
});

module.exports = router;