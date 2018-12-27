import database from './../Database/Database';
import * as sequelize from 'sequelize';

class UserModel {
  public user = database.seq.define('user', {
    username: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    displayName: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: sequelize.STRING,
      defaultValue: ''
    },
    description: {
      type: sequelize.STRING,
      defaultValue: ''
    },
    postCount: {
      type: sequelize.INTEGER,
      defaultValue: 0
    },
    followersCount: {
      type: sequelize.INTEGER,
      defaultValue: 0
    },
    followingCount: {
      type: sequelize.INTEGER,
      defaultValue: 0
    },
    favoritesCount: {
      type: sequelize.INTEGER,
      defaultValue: 0
    }
  });
}

export default new UserModel();
