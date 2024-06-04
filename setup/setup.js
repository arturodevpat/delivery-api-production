const db = require("../models/index.js");

async function setup() {
  try {
	const ratings = [];

	for (let i = 0; i < 100; i++) {
	  const userId = Math.floor(Math.random() * 2) + 1;
	  const restaurantId = Math.floor(Math.random() * 2) + 1;
	  const rating = Math.floor(Math.random() * 5) + 1;

	  ratings.push({
		userId,
		restaurantId,
		rating
	  });
	}

	await db.Rating.bulkCreate(ratings);

	console.log("👍 Calificaciones asignadas: ¡Listo!");
	console.log("🥳 Configuración completada: ¡Éxito!");
	process.exit();

  } catch (error) {
	console.error("🚫 ¡Error! La información del error es la siguiente:");
	console.error(error);
	process.exit();
  }
}

setup();
