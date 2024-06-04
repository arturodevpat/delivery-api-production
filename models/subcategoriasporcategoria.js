"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubcategoriasPorCategoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubcategoriasPorCategoria.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  SubcategoriasPorCategoria.init(
    {
      categoriaId: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubcategoriasPorCategoria",
    }
  );
  return SubcategoriasPorCategoria;
};
