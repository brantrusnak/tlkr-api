import { PrimaryKey, AutoIncrement, Column, ForeignKey, Table, CreatedAt, Model } from "sequelize-typescript";
import { User } from "../User/User.Model";
import { Post } from "../Post/Post.Model";

@Table
export class Favorite extends Model<Favorite> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @CreatedAt
  creationDate: Date;

}
