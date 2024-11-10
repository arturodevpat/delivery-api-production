const { where } = require("sequelize");
const db = require("../models/index.js");
const { connect } = require("../services/redis.js");

// obtener todos los registro de la base de datos
const getMainScreenData = async (req, res) => {
  try {
    // Conectar a Redis
    const client = await connect();
    
    // Intentar obtener datos de Redis
    const cachedData = await client.get("mainScreenData");
    
    // Si existe en caché, devolver los datos cacheados
    if (cachedData) {
      return res.status(200).json({ info: JSON.parse(cachedData) });
    }
    
    // Si no existe en caché, obtener de la base de datos
    const info = await db.PantallaPrincipal.findAll();
    
    // Guardar en Redis con un tiempo de expiración de 1 hora (3600 segundos)
    await client.set("mainScreenData", JSON.stringify(info), {
      EX: 3600
    });
    
    res.status(200).json({ info: info });
  } catch (error) {
    res.status(500).json({ 
      message: "Ha ocurrido un error al obtener los datos", 
      error: error.message 
    });
  }
};

// añadir un registro a la base de datos
const addMainScreenData = async (req, res) => {
  const { titulo1, titulo2, titulo3, titulo4, img, background } = req.body;
  console.log(titulo1, titulo2, titulo3, titulo4, img, background);
  if (!titulo1 || !titulo2 || !titulo3 || !titulo4 || !img || !background) {
    return res.status(500).json({ message: "todos los campos son necesarios" });
  }
  try {
    const data = await db.PantallaPrincipal.create({
      titulo1,
      titulo2,
      titulo3,
      titulo4,
      img,
      background,
    });
    
    // Invalidar el caché cuando se añade nuevo contenido
    const client = await connect();
    await client.del("mainScreenData");
    
    res
      .status(200)
      .json({ message: "informacion registrado correctamente", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "ha ocurrido un error", error: error.message });
  }
};

// actualizar un dato
const updateMainScreen = async (req, res) => {
  const { id } = req.params;
  const { titulo1, titulo2, titulo3, titulo4, img, background } = req.body;
  try {
    const data = await db.PantallaPrincipal.findOne({ where: { id } });
    if (!data) {
      return res
        .status(404)
        .json({ message: "no se encontro el registro", data });
    }
    const dataUpdate = await db.PantallaPrincipal.update(
      { titulo1, titulo2, titulo3, titulo4, img, background },
      { where: { id } }
    );
    
    // Invalidar el caché cuando se actualiza contenido
    const client = await connect();
    await client.del("mainScreenData");
    
    res
      .status(200)
      .json({ message: "se ha actualizado correctamente", dataUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ha ocurrido un error", error: error.message });
  }
};

// obtener un dato en concreto de la base de datos
const getOneDataMainScreen = async (req, res) => {
  const { id } = req.params;
  const data = await db.PantallaPrincipal.findByPk(id);
  res.json({ info: data });
};

const deleteOneDataMainScreen = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.PantallaPrincipal.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.json({ message: "no se ha encontrado el registro" });
    }
    
    // Invalidar el caché cuando se elimina contenido
    const client = await connect();
    await client.del("mainScreenData");
    
    res.json({ message: "registro borrado correctamente" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar el registro", 
      error: error.message 
    });
  }
};

module.exports = {
  getMainScreenData,
  addMainScreenData,
  updateMainScreen,
  getOneDataMainScreen,
  deleteOneDataMainScreen,
};
