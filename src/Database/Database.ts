import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../User/User.Model';
import { UserDetails } from '../UserDetails/UserDetails.Model';
import { Post } from '../Post/Post.Model';
import { Follow } from '../Follow/Follow.Model';
import { Favorite } from '../Favorite/Favorite.Model';

if(process.env.NODE_ENV !== 'production'){ 
  dotenv.config();
}

export class Database {
  seq = new Sequelize({
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    models: [User, UserDetails, Post, Follow, Favorite],
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: {
    },
    logging: process.env.MYSQL_LOGGING === 'true'
  });

  private shouldForce(): boolean {
    return process.env.MYSQL_FORCE_NEW_DB === 'true' ? true : false;
  }

  private async testConnection(): Promise<boolean> {
    try {
      await this.seq.authenticate();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async syncModels(): Promise<boolean> {
    try {
      let force = this.shouldForce();
      await this.seq.sync({ force });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async init(): Promise<boolean> {
    console.log('Loading database');
    let authorized = await this.testConnection();
    let synced = await this.syncModels();
    console.log('Finished loading database');
    return authorized && synced ? true : false;
  }
}
