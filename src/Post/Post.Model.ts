import { PrimaryKey, AutoIncrement, Column, ForeignKey, Table, CreatedAt, Model, BelongsTo } from "sequelize-typescript";
import { User } from "../User/User.Model";
import { UserDetails } from "../UserDetails/UserDetails.Model";

@Table
export class Post extends Model<Post> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @Column
  postedBy: number;

  @Column
  text: string;

  @Column
  favoriteCount: number;

  @Column
  isShowcase: boolean;

  @CreatedAt
  creationDate: Date;

  @BelongsTo(() => UserDetails, 'postedBy')
  userDetails: UserDetails;

}
