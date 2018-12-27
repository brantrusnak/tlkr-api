import database from './../Database/Database';
import * as sequelize from 'sequelize';

class FollowModel {
  public follower = database.seq.define('follower', {
    userId: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    followingUserId: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    }
  });
}

export default new FollowModel();
