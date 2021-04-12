import { Schema } from 'mongoose'
import { IUser } from '../../types'

type IUserSchema = Record<keyof IUser.IUserModel, any>

export const UserSchema: Schema<IUserSchema> = new Schema({
  appid: String,
  unionid: String,
  equipments: {
    type: [String]
  }
},{
  timestamps: {createdAt: 'created', updatedAt: 'updated'}
})
