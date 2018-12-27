import database from './../Database/Database';
import * as sequelize from 'sequelize';

class PostModel {
  public post = database.seq.define('post', {
    text: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    favoriteCount: {
      type: sequelize.INTEGER,
      defaultValue: 0
    },
    postedBy: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    isShowcase: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    }
  });
}

export default new PostModel();
