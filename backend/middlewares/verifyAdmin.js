const verifyAdmin = (request, response, next) => {
	try {

		const { user } = request.user;

		if (user.ID_Tipo_Usuarios !== 1) {
			return response.status(403).json({ Error: "Acceso denegado. No eres administrador." });
		}

		next();
	} catch (err) {
		return response.status(500).json({ Error: err.message });
	}
};

module.exports = { verifyAdmin };