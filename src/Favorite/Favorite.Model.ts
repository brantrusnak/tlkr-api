import database from './../Database/Database';
import * as sequelize from 'sequelize';

class FavoriteModel {
  public favorite = database.seq.define('favorite', {
    userId: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    postId: {
      type: sequelize.INTEGER,
      references: { model: 'posts', key: 'id' }
    }
  });
}

export default new FavoriteModel();
