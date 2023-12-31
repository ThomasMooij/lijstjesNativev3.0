import mongoose from "mongoose";
import Lists from "../models/Lists";
import Item, { ItemDocument } from "../models/Item";

export const getListItems = async (id: mongoose.Types.ObjectId) => {

try{   
    const list = await Lists.findById(id) 

    if (!list){
        throw new Error('list not found')
    }
    const listItems = list.items

    const items = Item.find({_id : {$in: listItems}})
    return items

}catch(error){
    console.log(error)
}}

export const createItem = async (input: ItemDocument) => {

    const {
        name, 
        price,   
        amountKey,
        amountValue,
        payed, 
        userId,
        listId,
        image
    } = input

    try{
        const item = new Item({
            name,
            price,
            amountKey,
            amountValue,
            payed,
            userId,
            listId,
            image,
        })

        const savedItem = await item.save();

        const updatedList = await Lists.findByIdAndUpdate(
            {_id: listId},
            {$push: {items: savedItem._id}},
            {new: true}
        )

        return savedItem

    }catch({message} : any){
        throw new Error('Error creating item: ' + message);
    }
};

export const getItemsByListId = async (id: mongoose.Types.ObjectId) => {
  try{  
    const items = await Item.find({listId: id})
    return items;
    } catch({message} : any){
    throw new Error('Error getting item by listId:' + message)
    }
}