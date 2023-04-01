import { Sequelize } from 'sequelize-typescript';
import { Issue } from '../models/issue.model';

export const connect = () => {
  //const hostName = process.env.HOST;
  //const userName = process.env.USER;
  //const password = String(process.env.PASSWORD);
  //const database = process.env.DB;

  const sequelize = new Sequelize('scrum-manager', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    repositoryMode: true,
    port: 5432,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    }
  });

  sequelize.addModels([Issue]);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  return db;
};
