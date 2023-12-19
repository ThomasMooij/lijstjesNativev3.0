import mongoose from "mongoose";
import { createItem, getListItems } from "../controllers/ItemController";
import  { ItemDocument } from "../models/Item";
import { getUserById } from "../controllers/UserController";


const itemResolvers = {
    //Queries
    Query: {
        getListItems: (_parent : any, { id } : {id: mongoose.Types.ObjectId}) => getListItems(id)
    },
    //MUTATIONS
    Mutation: {
        createItem: async (parent : any, {input} : {input: ItemDocument}) => {
            try{
                const createdItem = await createItem(input);
                return createdItem;
            }catch(error: any){
                throw new Error('Error creating item:' + error.message)
            }
        }
    },
    Item:{
        userId: (parent: ItemDocument) => getUserById(parent.userId),
    }
}   

export default itemResolvers