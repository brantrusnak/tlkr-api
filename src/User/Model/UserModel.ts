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
    // TODO:
    // Move hash rounds to config
    let hash = await bcrypt.hash(password, 10).then(hash => hash);
    return hash;
  }

  public async comparePassword(password: string, hashedPassword: string) {
    let result = await bcrypt.compare(password, hashedPassword);
    return result;
  }

  public async findById(id: number) {
    let result = await this.user.findByPrimary(id);
    return result;
  }
}

export default new UserModel();
