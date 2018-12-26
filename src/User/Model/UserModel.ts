import database from '../../Database/Database';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import passport = require('passport');

// Move this out?
interface UserAttr {
  username: string;
  password: string;
  email: string;
}

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

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.HASH_ROUNDS));
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async findById(id: number) {
    return await this.user.findByPk(id);
  }
}

export default new UserModel;
