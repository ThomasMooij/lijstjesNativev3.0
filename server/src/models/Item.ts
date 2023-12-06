import mongoose, { Schema } from 'mongoose';  

export interface Item {
  name: string,
  price?: number,
  amountKey: string,
  amountValue: string,
  payed: boolean,
  userId: mongoose.Types.ObjectId,
  listId: mongoose.Types.ObjectId,
}

  const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0 },
    amountKey: {type: String},
    amountValue: {type: String},
    payed: {type: Boolean},
    userId: {
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
    },
    listId: {
      type: Schema.Types.ObjectId, 
      ref: 'List', 
      required: true
    }
  },{timestamps:true});
  
  export default mongoose.model<Item>('Item', ItemSchema);
  