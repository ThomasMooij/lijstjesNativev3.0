import User, { UserDocument } from '../models/User'
import mongoose from "mongoose";

export const createUser = async (input: UserDocument) : Promise<UserDocument>=> { 
  try{
    const {firstName, lastName, email, password } = input

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = await User.create(input);

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
        const matched = await user.comparePassword(password);
        if (!matched) throw new Error( "Email/Password mismatch!");
          //add user token like on webpage
    }
    catch(error: any){
      throw new Error('Inloggen mislukt:'+ error.message)
    }
};

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

export const getUsersById = async (id: mongoose.Types.ObjectId) => {
  try{
    const users = await User.findById({id})

  }catch({message}: any){
    throw new Error('Error getting users by id:' + message)
  }
};

export const getUserFriends = async ({userId} : mongoose.Types.ObjectId) => {
  try {
    const user = await User.findById({userId}).populate('friends', 'firstName');
    if (!user) {
      throw new Error('User not found');
    }
    return user.friends;
  } catch (error: any) {
    console.error('Error fetching user friends:', error);
    throw new Error('Error fetching user friends');
  }
};

