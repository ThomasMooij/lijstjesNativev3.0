import mongoose, { Schema } from 'mongoose';  

export interface ItemDocument {
  _id: mongoose.Types.ObjectId
  name: string,
  price?: number,
  amountKey: string,
  amountValue: string,
  payed: boolean,
  userId: mongoose.Types.ObjectId,
  listId: mongoose.Types.ObjectId,
  image: string;
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
    },
    image: { type: String },
  },{timestamps:true});
  
  export default mongoose.model<ItemDocument>('Item', ItemSchema);
  