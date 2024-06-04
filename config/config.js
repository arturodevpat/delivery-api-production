const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
     dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Esto es necesario solo si estás usando un certificado autofirmado
      }
    }
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
    ssl: "require",
     dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Esto es necesario solo si estás usando un certificado autofirmado
      }
    }
  },
};
