const db = require("../models/index.js");
const { purchaseConfirmation } = require("../services/emailService.js");

const allPurchases = async (req, res) => {
  try {
    const { id } = req.params;

    const userExist = await db.User.findOne({
      where: { id },
    });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = await userExist.getPedidos();

    res.json({ message: data });
  } catch (error) {
    return res.status(500).json({
      error: "Ha ocurrido un error al obtener el historial de compras",
    });
  }
};

const purchase = async (req, res) => {
  const { direccion_entrega, items } = req.body;
  const { id, name, email } = req.user;

  try {
    const fechaActual = new Date();

    // Crear el pedido
    const newPurchase = await db.Pedidos.create({
      userId: id,
      fecha_pedido: fechaActual,
      estado_pedido: "pendiente",
      direccion_entrega,
    });

    // Crear los detalles del pedido
    const detallePedidos = await Promise.all(
      items.map(async (item) => {
        return db.DetallePedidos.create({
          pedidoId: newPurchase.id,
          productoId: item.productId,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario,
        });
      })
    );

    // Enviar correo de confirmación
    await purchaseConfirmation(name, email, {
      items: items.map((item) => ({
        name: `Producto ${item.productId}`,
        quantity: item.cantidad,
        price: item.precio_unitario,
        total: item.cantidad * item.precio_unitario,
      })),
      total: items.reduce(
        (total, item) => total + item.cantidad * item.precio_unitario,
        0
      ),
    });

    res.json({ id, name, email });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { purchase, allPurchases };
