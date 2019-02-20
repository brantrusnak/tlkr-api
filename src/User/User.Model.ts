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
    }
  });
}

export default new UserModel();
