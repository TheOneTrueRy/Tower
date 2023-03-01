import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId

export const TicketSchema = new Schema(
  {
    eventId: {type: ObjectId, required: true, ref: 'Event'},
    accountId: {type: ObjectId, required: true, ref: 'Account'}
  },
  {timestamps: true, toJSON: {virtuals: true}}
)