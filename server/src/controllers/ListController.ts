import mongoose from 'mongoose';
import List, { ListDocument } from '../models/Lists';
import User from '../models/User';
import { ListArgs } from '../resolvers/listResolver';

export const createList = async (input: ListArgs) => {
  try {
    const { title, items, userId } = input;

    // trying to add automatic versioning if user already created a list with provided title
    let newTitle = title;
    let version = 0;

    // Find all titles starting with the specified prefix
    const existingLists = await List.find({ title: { $regex: new RegExp(`^${title}(\\.\\d+\\.\\d+)?$`, 'i') } });

    if (existingLists.length > 0) {
      const versions = existingLists.map((list) => {
        const lastVersion = list.title.match(/(\d+\.\d+)$/);
        return lastVersion ? parseInt(lastVersion[0].split('.')[1]) : 0;
      });
      version = Math.max(...versions) + 1;
      newTitle = `${title}.${version}.0`;
    }

    const list = new List({
      title: newTitle,
      items,
      userId,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { lists: list._id } },
      { new: true }
    );

    if (!updatedUser) {
       // User not found, delete the newly created list
      await List.deleteOne({ _id: list._id });
      throw new Error('User not found');   
    }

    await list.save();

    return list;
  } catch (error: any) {
    throw new Error('Error creating list:' + error.message);
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
