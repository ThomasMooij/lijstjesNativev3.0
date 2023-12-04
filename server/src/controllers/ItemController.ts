import mongoose from "mongoose";
import Lists from "../models/Lists";
import Item from "../models/Item";

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

export const createItem = async (name: string, price: number | undefined, user: mongoose.Types.ObjectId, list: mongoose.Types.ObjectId) => {
    try{
        const item = new Item({
            name,
            price,
            user,
            list,
        })

        const updatedList = await Lists.findByIdAndUpdate(
            {_id: list},
            {$push: {items: item._id}},
            {new: true}
        )

    }catch(error){

    }
}