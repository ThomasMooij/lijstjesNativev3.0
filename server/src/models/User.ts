import mongoose from "mongoose";
import { Model, Schema, model } from "mongoose";
import { hash,compare } from "bcrypt";

export interface UserDocument {
    _id: mongoose.Types.ObjectId
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    picturePath: string;
    friends: Schema.Types.ObjectId[],
    lists: Schema.Types.ObjectId[],
    recipes: Schema.Types.ObjectId[],
    savedListsIds:Schema.Types.ObjectId[],
    savedRecipesIds: Schema.Types.ObjectId[],
}

interface Methods {
    comparePassword(password : string) : Promise<boolean>
  }

export const UserSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
        required:true,
        min:2,
        max:50
    },
    lastName: {
        type: String,
        required:true,
        min:2,
        max:50
    },
    email: {
        type: String,
        required:true,
        min:2,
        max:50,
        unique:true,
    },
    password: {
        type: String,
        required:true,
        min:5,
  
    },
    verified: {
        type: Boolean,
        default: true,
      },
    picturePath: {
        type: String,
        default: "",
    },
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],
    lists: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'List' 
    }],
    recipes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Recipe' 
    }],
    savedListsIds: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'List' 
    }],
    savedRecipesIds: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Recipe' 
    }],    
},{timestamps:true})

UserSchema.pre('save' , async function(next) {
    if (this.isModified("password")){
      this.password = await hash(this.password, 10)
    }
    next()
  })
  
UserSchema.methods.comparePassword = async function(password : string){
    const result = await compare(password, this.password)
    return result
  }

export default model("User" , UserSchema) as Model<UserDocument, {}, Methods >

