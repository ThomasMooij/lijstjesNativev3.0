import mongoose from 'mongoose';
import { getUserById, getAllUsers, login, getUserFriends, createUser } from '../controllers/UserController';
import { getAllLists } from '../controllers/ListController';
import notFound from './graphqlErrors/notFound';
import { UserDocument } from '../models/User';

 const userResolvers = {
  //QUERIES
  Query: {
    getUser: async (parent: any, args: UserDocument) =>{ 
      const id = new mongoose.Types.ObjectId(args.id)
      const user = await getUserById(id)
      if(!user){
        throw notFound('User not found with id:'+ args.id)
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
    lists : (parent: UserDocument) => getAllLists(parent.id),
    friends : (parent: UserDocument) => getUserFriends(parent.friends)
  }
};

export default userResolvers