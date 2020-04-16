import {Table, Column, Model, CreatedAt, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import { User } from '../User/User.Model';

@Table
export class UserDetails extends Model<UserDetails> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  username: string;

  @Column
  displayName: string;

  @Column
  description: string;

  @Column
  postCount: number;
 
  @Column
  followersCount: number;

  @Column
  followingCount: number;

  @CreatedAt
  creationDate: Date;

}
