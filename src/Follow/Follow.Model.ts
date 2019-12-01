import { PrimaryKey, AutoIncrement, Column, ForeignKey, Table, CreatedAt, Model } from "sequelize-typescript";
import { User } from "../User/User.Model";

@Table
export class Follow extends Model<Follow> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  followingUserId: number;

  @CreatedAt
  creationDate: Date;

}
