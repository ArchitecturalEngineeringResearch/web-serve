import { Schema } from 'mongoose'
import { IEquipment } from '../../types'

type IEquipmentSchema = Record<keyof IEquipment.IEquipment, any>

export const UserSchema: Schema<IEquipmentSchema> = new Schema({
  code: String,
  name: String,
  description: String,
  positions: {
    type: [String]
  }
},{
  timestamps: {createdAt: 'created', updatedAt: 'updated'}
})
