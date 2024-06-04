"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetallePedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetallePedidos.belongsTo(models.Pedidos, {
        foreignKey: "pedidoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      DetallePedidos.belongsTo(models.Productos, {
        foreignKey: "productoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  DetallePedidos.init(
    {
      pedidoId: DataTypes.INTEGER,
      productoId: DataTypes.INTEGER,
      cantidad: DataTypes.INTEGER,
      precio_unitario: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "DetallePedidos",
    }
  );
  return DetallePedidos;
};
