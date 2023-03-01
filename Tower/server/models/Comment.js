import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema(
  {
    creatorId: {type: ObjectId, required: true, ref: 'Account'},
    eventId: {type: ObjectId, required: true, ref: 'Event'},
    body: {type: String, required: true, maxLength: 5000},
    isAttending: {type: Boolean, default: false}
  },
  defaultSchemaOptions
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})