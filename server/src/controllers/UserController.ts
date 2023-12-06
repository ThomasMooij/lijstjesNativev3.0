import User, { UserDocument } from '../models/User'
import mongoose from "mongoose";
import { UserArgs } from '../resolvers/userResolver';

export const createUser = async (input: UserArgs) : Promise<UserDocument>=> { 
  try{

    const {firstName, lastName, email, password } = input

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = await User.create({ firstName, lastName, email, password });

    return user;
  }
  catch(error: any){
    throw new Error('Gebruik niet aangemaakt:'+ error.message)
  }
};
export const login = async (email:string, password: string)  => {
    try{
        const user = await User.findOne({email})
        
        if (!user) throw new Error( "Email/Password mismatch!" );
        const matched = await user.comparePassword(password)
        if (!matched) throw new Error( "Email/Password mismatch!");

          //add user token like on webpage

    }
    catch(error: any){
      throw new Error('Inloggen mislukt:'+ error.message)
    }
}
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error: any) {
    throw new Error('Fout bij het ophalen van gebruikers: ' + error.message);
  }
};
export const getUserById = async (id: mongoose.Types.ObjectId) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error: any) {
    throw new Error('Fout bij het ophalen van de gebruiker: '+ id + error.message);
  }
};

export const getUserFriends = async (userId : mongoose.Types.ObjectId) => {
  try{
    console.log(userId)
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found');
    }
    const friendIds = user.friends
    
    const userFriends = await User.find ({_id: {$in: friendIds }})

    return userFriends
  }catch(error){
    console.error('Error fetching user friends:', error);
    throw new Error('Error fetching user friends');
  }
}
