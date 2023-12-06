import mongoose, { Schema, Document } from 'mongoose'
import {Item} from '../models/Item'


export interface ListDocument extends Document {
  title: string;
  userId: mongoose.Schema.Types.ObjectId;
  participants?:[mongoose.Schema.Types.ObjectId];
  items?: Item[];
}

const ListSchema: Schema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  description: {type: String},
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  items:   [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Item"
  }],
}, {timestamps: true});

export default mongoose.model<ListDocument>('List', ListSchema); 
