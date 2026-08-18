import dotenv from "dotenv";
dotenv.config();

// Lista de variables obligatorias
const requiredVars = ["PORT", "NODE_ENV"];

// Verificación básica
requiredVars.forEach(v => {
  if (!process.env[v]) {
    console.error(`Falta la variable de entorno: ${v}`);
    process.exit(1);
  }
});

// Export simple con los valores
export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV
};