import mongoose from 'mongoose';
import { getUserById, getAllUsers, login, getUserFriends, createUser } from '../controllers/UserController';
import { getAllLists } from '../controllers/ListController';
import notFound from './graphqlErrors/notFound';

export interface UserArgs {
  id:mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  friends: [mongoose.Types.ObjectId];
  lists:[mongoose.Types.ObjectId];
}

 const userResolvers = {
  //QUERIES
  Query: {
    getUser: async (parent: any, args: UserArgs) =>{ 
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
    createUser: async (_parent: any, {input}: {input: UserArgs}) => {
      try{
        const createdUser = await createUser(input);
        return createdUser
      }catch({message} : any){
        throw new Error('Error creating user:' + message)
      }
    },
    loginUser: (_parent: any, args: UserArgs) => login(args.email, args.password),
  },

  User: {
    lists : (parent: UserArgs) => getAllLists(parent.id),
    friends : (parent: UserArgs) => getUserFriends(parent.id)
  }
};

export default userResolvers