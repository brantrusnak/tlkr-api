import database from './../Database/Database';
import * as sequelize from 'sequelize';

class UserDetailsModel {
  public userDetails = database.seq.define('userDetail', {
    userId: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
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

export default new UserDetailsModel();
