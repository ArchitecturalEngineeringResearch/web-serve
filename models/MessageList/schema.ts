import { Schema } from 'mongoose'
import { IMessageList } from '../../types'

type IMessageSchema = Record<keyof IMessageList.ICreateMessage, any>

export const MessageSchema: Schema<IMessageSchema> = new Schema({
  title: String,
  type: String,  // 车辆类型
  description: String,
  phoneNumber: Number,
  province: String,
  city: String,
  longitude: String,
  latitude: String,
  endDate: String,
  status: {
    type: String,
    enum: ['NO_IDLE', 'IDLE'], // 枚举
    required: 'Please fill in your status.' // 必填项
  },
  photos: {
    type: [String],
  },
},{
  timestamps: {createdAt: 'created', updatedAt: 'updated'}
})
