import mongoose, { Types } from "mongoose";
import {getRecipesByUserId, getRecipeById, getRecipesByTag, getFeedRecipes, createRecipe } from '../controllers/RecipeController'

const recipeResolvers = {
    //QUERIES
    Query: {
      getUserRecipes: (_parent: any, { userId }: { userId: Types.ObjectId }) => getRecipesByUserId(userId),
      getSingleRecipe: (_parent: any, { id }: { id: Types.ObjectId }) => getRecipeById(id),
      getRecipeByTag: (_parent: any, { tag }: { tag: string }) => getRecipesByTag(tag),
      getFeedRecipes: () => getFeedRecipes(),
    },
    //MUTATIONS
    Mutation: {
      createRecipe: (_parent: any, args: any) => createRecipe(args),
    }
    
  };
  
  export default recipeResolvers