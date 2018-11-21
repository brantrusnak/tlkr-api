import * as Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

class Database {
  seq = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  public async init(refresh?: boolean) {
    await this.seq.authenticate();
    await this.seq.sync({force: refresh});
  }
}

export default new Database();
