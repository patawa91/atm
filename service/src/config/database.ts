import { Sequelize } from 'sequelize';
import config from 'config';

const dbConfig = config.get('database') as any;

export const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }); 