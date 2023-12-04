import mongoose from 'mongoose';
import List, { ListDocument } from '../models/Lists';
import User from '../models/User';
import { Item } from '../resolvers/itemResolver';

export const createList = async (title: string, items: [Item] | undefined, userId: mongoose.Types.ObjectId) => {
  // token validation
  const list = new List({ 
    title, 
    items, 
    userId: userId
  });
 
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { lists: list._id } },
    { new: true }
  );
  
    if(!updatedUser){
      throw new Error('User not found')
    }

  await list.save();
  
  return list;
};
export const getAllLists = async (userId: mongoose.Types.ObjectId) => {
  try {
    const lists = await List.find({ userId }); 
    return lists;
  } catch (error: any) {
    throw new Error('Error fetching lists: ' + error.message);
  }
};
export const getListById = async (id: mongoose.Types.ObjectId) => {
  console.log(id)
  const list = await List.findById(new mongoose.Types.ObjectId(id));
  console.log(list)
  return list;
};
