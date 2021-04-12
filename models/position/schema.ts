import { Schema } from 'mongoose'
import { IPosition } from '../../types'

type IPositionSchema = Record<keyof IPosition.IPosition, any>

export const PositionSchema: Schema<IPositionSchema> = new Schema({
  equipmentId: String,
  gps:{
    type: [[String]]
  }
},{
  timestamps: {createdAt: 'created'}
})
