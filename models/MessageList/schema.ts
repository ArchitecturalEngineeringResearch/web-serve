import { Schema } from 'mongoose'
import { IMessageList } from '../../types'

type IMessageSchema = Record<keyof IMessageList.ICreateMassage, any>

export const MessageSchema: Schema<IMessageSchema> = new Schema({
  title: String,
  description: String,
  phoneNumber: Number,
  createDate: [String,Number],
  endDate: [String,Number],
  province: String,
  city: String,
  longitude: String,
  latitude: String,
})
