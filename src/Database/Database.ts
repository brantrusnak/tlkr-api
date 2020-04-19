import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../User/User.Model';
import { UserDetails } from '../UserDetails/UserDetails.Model';
import { Post } from '../Post/Post.Model';
import { Follow } from '../Follow/Follow.Model';
import { Favorite } from '../Favorite/Favorite.Model';
import { Dialect } from 'sequelize/types';

if(process.env.NODE_ENV !== 'production'){ 
  dotenv.config();
}

export class Database {
  seq = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_TYPE as Dialect,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    models: [User, UserDetails, Post, Follow, Favorite],
    pool: {
      max: parseInt(process.env.DATABASE_POOL_MAX),
      min: parseInt(process.env.DATABASE_POOL_MIN),
      acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
      idle: parseInt(process.env.DATABASE_POOL_IDLE)
    },
    operatorsAliases: {
    },
    logging: process.env.DATABASE_LOGGING === 'true'
  });

  private shouldForce(): boolean {
    return process.env.DATABASE_FORCE_NEW_DB === 'true' ? true : false;
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
      await this.seq.sync({ force: this.shouldForce() });
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
