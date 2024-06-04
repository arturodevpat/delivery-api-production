const express = require("express");
const router = express.Router();
const {
  addSubcategoria,
  getAllSubcategoriasPorCategoria,
} = require("../controllers/subcategorias.controller");

router.post("/addSubcategorias", addSubcategoria);
router.get("/getSubcategorias/:id", getAllSubcategoriasPorCategoria);

module.exports = router;
