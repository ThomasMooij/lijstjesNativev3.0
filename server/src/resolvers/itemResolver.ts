import mongoose from "mongoose";
import { createItem, getListItems } from "../controllers/ItemController";
import { GraphQLError } from 'graphql';
import { create } from "domain";

export interface ItemArgs {
    name: string,
    price?: number,
    amountKey: string,
    amountValue: string,
    payed: boolean,
    user: mongoose.Types.ObjectId,
    list: mongoose.Types.ObjectId,
  }

const itemResolvers = {
    //Queries
    Query: {
        getListItems: (_parent : any, { id } : {id: mongoose.Types.ObjectId}) => getListItems(id)
    },
    //MUTATIONS
    Mutation: {
        createItem: async (parent : any, {input} : {input: ItemArgs}) => {
            try{
                const createdItem = await createItem(input);
                return createdItem;
            }catch(error: any){
                throw new Error('Error creating item:' + error.message)
            }
        }
    },
}   

export default itemResolvers