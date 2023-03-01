import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";


export const EventSchema = new Schema(
  {
    creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    name: {type: String, required: true, maxLength: 200, minLength: 3},
    description: {type: String, required: true, maxLength: 5000, minLength: 3},
    coverImg: {type: String, required: true, maxLength: 5000},
    location: {type: String, required: true, maxLength: 300},
    capacity: {type: Number, required: true},
    startDate: {type: Date, required: true},
    isCanceled: {type: Boolean, default: false},
    type: {type: String, enum: ['concert', 'convention', 'sport', 'digital', 'other'], default: 'other'},
  },
  defaultSchemaOptions
)