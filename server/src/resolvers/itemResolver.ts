import mongoose from "mongoose";
import { createItem, getListItems } from "../controllers/ItemController";
import { GraphQLError } from 'graphql';

export interface Item {
    name: string,
    price?: number,
    userId: mongoose.Types.ObjectId,
    listId: mongoose.Types.ObjectId,
  }

const itemResolvers = {
    //Queries
    Query: {
        getListItems: (_parent : any, { id } : {id: mongoose.Types.ObjectId}) => getListItems(id)
    },
    //MUTATIONS
    Mutation: {
        createItem: (parent : any, args : Item) => createItem(args.name, args.price, args.userId, args.listId)
    },
}   

export default itemResolvers