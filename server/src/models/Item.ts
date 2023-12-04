import mongoose, { Schema } from 'mongoose';  

export interface Item {
  name: string,
  price: number,
  userId: mongoose.Types.ObjectId,
  listId: mongoose.Types.ObjectId,
}

  const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0 },
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
  