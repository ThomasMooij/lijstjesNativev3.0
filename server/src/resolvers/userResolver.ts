import mongoose from 'mongoose';
import { getUserById, getAllUsers, login, getUserFriends, createUser } from '../controllers/UserController';
import { getAllLists } from '../controllers/ListController';
import notFound from './graphqlErrors/notFound';
import User, { UserDocument } from '../models/User';
import Lists from '../models/Lists';
import Recipe from '../models/Recipe';

 const userResolvers = {
  //QUERIES
  Query: {
    getUser: async (parent: any, args: UserDocument) =>{ 
      console.log(args)
      const id = new mongoose.Types.ObjectId(args._id)
      const user = await getUserById(id)
      if(!user){
        throw notFound('User not found with id:'+ args._id)
      }
      return user
    },
    getAllUsers: async () => getAllUsers(),
  },
  //MUTATIONS
  Mutation: {
    createUser: async (_parent: any, {input}: {input: UserDocument}) => {
      try{
        const createdUser = await createUser(input);
        return createdUser
      }catch({message} : any){
        throw new Error('Error creating user:' + message)
      }
    },
    loginUser: (_parent: any, args: UserDocument) => login(args.email, args.password),
  },

  User: {
    lists : (parent: UserDocument) => getAllLists(parent._id),
    friends: async (parent: UserDocument) => {
      try {
        const friends = await User.find({ _id: { $in: parent.friends } });
        return friends;
      } catch (error: any) {
        console.error('Error fetching user friends:', error);
        throw new Error('Error fetching user friends');
      }
    },
    savedLists: async (parent: UserDocument) => {
      try {
         const savedLists = await Lists.find({ _id: { $in: parent.savedListsIds } });
        return savedLists;
      } catch (error: any) {
        console.error('Error fetching saved lists:', error);
        throw new Error('Error fetching saved lists');
      }
    },
    savedRecipes: async (parent: UserDocument) => {
      try {
        const savedRecipes = await Recipe.find({ _id: { $in: parent.savedRecipesIds } });
        return savedRecipes;
      } catch (error: any) {
        console.error('Error fetching saved recipes:', error);
        throw new Error('Error fetching saved recipes');
      }
    }

  }
};

export default userResolvers