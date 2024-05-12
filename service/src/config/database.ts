import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('challenge', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
  });