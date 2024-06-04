const categoria = require("../models/categoria.js");
const db = require("../models/index.js");

const addSubcategoria = async (req, res) => {
  try {
    const { categoriaId, nombre, image_url } = req.body;

    if (!nombre || !image_url) {
      return res.status(400).json({
        error: "favor de proporcionar todos los datos",
        success: false,
      });
    }

    const categoriaExiste = await db.Categoria.findOne({
      where: { id: categoriaId },
    });

    if (!categoriaExiste) {
      return res.status(404).json({ error: "La categoria no existe" });
    }

    await db.SubcategoriasPorCategoria.create({
      nombre,
      image_url,
      categoriaId,
    });
    res.status(201).json({ message: "Categoria created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al añadir la categoria", sucess: false });
  }
};

const getAllSubcategoriasPorCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categorias = await db.SubcategoriasPorCategoria.findAll({
      where: {
        categoriaId: id,
      },
    });

    return res.status(200).json({
      categorias,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un error al obtener la categoria", sucess: false });
  }
};

module.exports = {
  addSubcategoria,
  getAllSubcategoriasPorCategoria,
};
