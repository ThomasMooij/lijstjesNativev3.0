import mongoose, { Types } from "mongoose";
import {getRecipesByUserId, getRecipeById, getRecipesByTag, getFeedRecipes, createRecipe } from '../controllers/RecipeController'
import { RecipeDocument } from "../models/Recipe";

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
      // INPUT ISSUES?
      createRecipe: async (_parent: any,  {input} : {input : RecipeDocument} ) => {
        const createdRecipe = await createRecipe(input);
        return createdRecipe
      }
    },
    
  };
  
  export default recipeResolvers