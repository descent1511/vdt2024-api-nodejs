import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, PrimaryKey, DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import hashPassword from '../utils/hashPassword'
export type UserAttributes = {
  id: string;
  fullName: string;
  email: string;
  password : string;
  university: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: string;
  region : string;
  imgUrl : string ;
  role: string;
};

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @AllowNull(false)
  @Column
  password: string


  @Column
  university: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imgUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender!: string;


  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'user'
  })
  role: string;

  @BeforeCreate
  @BeforeUpdate
  static generatePasswordHash(instance: User) {
      const { password } = instance

      if (instance.changed('password')) {
          instance.password = hashPassword(password)
      }
  }

}

export default User;
