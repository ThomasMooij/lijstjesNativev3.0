import mongoose from 'mongoose';
import { getListById, getAllLists, createList } from '../controllers/ListController';
import { getItemsByListId } from '../controllers/ItemController';

export interface ListArgs {
  id:mongoose.Types.ObjectId;
  title: string;
  items?: [mongoose.Types.ObjectId] | undefined;//ID ???
  user: mongoose.Types.ObjectId
  createdAt: string,
  updatedAt:string
}

const listResolvers = {
  // QUERIES
  Query: {
    getList: (_parent : any, { id } : {id: mongoose.Types.ObjectId} ) => getListById(id),
    getAllLists: (_parent : any, { userId  } : {userId: mongoose.Types.ObjectId}) => getAllLists(userId),
  },
  //MUTATIONS
  Mutation: {
    createList: async (_parent: any, { input }: { input: ListArgs }) => {
      try {
        const createdList = await createList(input);
        return createdList;
      } catch (error: any) {
        throw new Error('Error creating list: ' + error.message);
      }
    },
  },
  List : {
    date: (list : ListArgs) => toIsoDate(list.createdAt),
    items: (list: ListArgs) => getItemsByListId(list.id) // this function is not working help solve?
  }
};

function toIsoDate(value : string) {
  console.log(value)
  const date = new Date(value);
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}-${month}-${year}`;
}

export default listResolvers;
