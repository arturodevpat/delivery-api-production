"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedidos.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pedidos.hasMany(models.DetallePedidos, {
        foreignKey: "pedidoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Pedidos.init(
    {
      userId: DataTypes.INTEGER,
      fecha_pedido: DataTypes.DATE,
      estado_pedido: DataTypes.STRING,
      direccion_entrega: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pedidos",
    }
  );
  return Pedidos;
};
