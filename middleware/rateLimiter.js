const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 120000, // 2 minutos
  max: 5,
  message: 'Demasiados intentos de inicio de sesión desde esta IP, inténtalo de nuevo después de 2 minutos'
});

module.exports = loginLimiter;