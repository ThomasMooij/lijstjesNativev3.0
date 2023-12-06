import mongoose from 'mongoose';
import List, { ListDocument } from '../models/Lists';
import User from '../models/User';
import { ListArgs } from '../resolvers/listResolver';

export const createList = async (input: ListArgs) => {
  try{
    // token validation
    const {title, items, user} = input
    console.log(title)

    const existingList = await List.findOne({ title, user });
    if (existingList) {
      throw new Error('A list with the same title already exists for this user');
    }

    const list = new List({ 
      title, 
      items, 
      user: user
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      { $push: { lists: list._id } },
      { new: true }
    );
    
      if(!updatedUser){
        throw new Error('User not found')
      }

    await list.save();
    
    return list;
  }catch(error: any){
    throw new Error('Error creating list:' + error.message)
  }
};
export const getAllLists = async (userId: mongoose.Types.ObjectId) => {
  try {
    console.log({userId})
    const lists = await List.find({userId}); 
    console.log(lists)
    return lists;
  } catch (error: any) {
    throw new Error('Error fetching lists: ' + error.message);
  }
};
export const getListById = async (id: mongoose.Types.ObjectId) => {
  console.log(id)
  const list = await List.findById(id);
  console.log(list)
  return list;
};
