import mongoose from 'mongoose';
import { getUserById, getAllUsers, create, login, getUserFriends } from '../controllers/UserController';
import { getAllLists } from '../controllers/ListController';
import notFound from './graphqlErrors/notFound';


interface UserArgs {
  id:mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  friends: [mongoose.Types.ObjectId];
}

 const userResolvers = {
  //QUERIES
  Query: {
    getUser: async (parent: any, args: UserArgs) =>{ 
      const user = await getUserById(args.id)
      if(!user){
        throw notFound('User not find with id:'+ args.id)
      }
      return user
    },
    getAllUsers: async () => getAllUsers(),
  },
  //MUTATIONS
  Mutation: {
    createUser: (parent: any, args: UserArgs) => create(args.firstName, args.lastName, args.email, args.password),
    loginUser: (parent: any, args: UserArgs) => login(args.email, args.password),
  },

  User: {
    lists : (user: UserArgs) => getAllLists(user.id),
    friends : (user: UserArgs) => getUserFriends(user.id)
  }
};

export default userResolvers