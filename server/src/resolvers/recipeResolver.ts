import mongoose, { Types } from "mongoose";
import {getRecipesByUserId, getRecipeById,  createRecipe } from '../controllers/RecipeController'
import { RecipeDocument } from "../models/Recipe";
import { getUserById } from "../controllers/UserController";
import { getItemsByListId } from "../controllers/ItemController";

const recipeResolvers = {
    //QUERIES
    Query: {
      getUserRecipes: async (_parent: any, { id }: { id : Types.ObjectId }) => 
      {
        const userRecipes = await getRecipesByUserId(id);
        console.log(userRecipes)
        return userRecipes
      },    
      getSingleRecipe: (_parent: any, { id }: { id: Types.ObjectId }) => getRecipeById(id),
    },
    //MUTATIONS
    Mutation: {
      createRecipe: async (_parent: any,  {input} : {input : RecipeDocument} ) => {
        const createdRecipe = await createRecipe(input);
        return createdRecipe
      }
    },
    // TYPE
    Recipe: {
      userId: (parent: RecipeDocument) => getUserById(parent.userId),
      items: (parent: RecipeDocument) => getItemsByListId(parent.id),
    }
  };
  
  export default recipeResolvers