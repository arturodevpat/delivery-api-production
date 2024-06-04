const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOSTEMAIL,
  port: process.env.SMTPPORT,
  secure: true,
  auth: {
    user: process.env.USERSMTP,
    pass: process.env.PASSSMTP,
  },
});

async function purchaseConfirmation(userName, userEmail, purchaseDetails) {
  let confirmationMessage = `
      <p style="font-family: Arial, sans-serif; font-size: 16px;">
        ¡Hola ${userName}!<br><br>
        Gracias por tu compra. A continuación, encontrarás un resumen de tu pedido:
      </p>
      
      <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
        <thead>
          <tr>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Producto</th>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cantidad</th>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Precio Unitario</th>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${purchaseDetails.items
            .map(
              (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.price}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.total}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Total:</th>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">$${
              purchaseDetails.total
            }</th>
          </tr>
        </tfoot>
      </table>
      
      <p style="font-family: Arial, sans-serif; font-size: 16px;">
        ¡Gracias por tu compra! Si tienes alguna pregunta o inquietud, no dudes en contactarnos.<br><br>
        Equipo de deliveryApp 😊
      </p>
    `;

  const mailOptions = {
    from: "arturo.dev.pat@gmail.com",
    to: userEmail,
    subject: "Confirmación de compra",
    html: confirmationMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado correctamente.");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}

module.exports = {
  purchaseConfirmation,
};
