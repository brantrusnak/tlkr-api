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

  private shouldForce(): boolean {
    return process.env.DB_FORCE_NEW_DB === "true" ? true : false;
  }

  private async testConnection(): Promise<boolean> {
    try {
      await this.seq.authenticate();
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  private async syncModels(): Promise<boolean> {
    try {
      let force = this.shouldForce();
      await this.seq.sync({force: force});
      return true;
    } catch(error) {
      return false;
    }
  }

  public async init(): Promise<boolean> {
    let authorized = await this.testConnection();
    let synced = await this.syncModels();
    return authorized && synced ? true : false;
  }
}

export default new Database;
