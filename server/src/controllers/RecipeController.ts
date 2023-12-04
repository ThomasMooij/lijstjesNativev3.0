import mongoose , { Types } from "mongoose"
import Recipe, { RecipeDocument } from '../models/Recipe';

  export const getRecipeById = async (id: Types.ObjectId): Promise<RecipeDocument | null> => {
    try {
      const recipe = await Recipe.findById(id);
      return recipe;
    } catch (error) {
      console.error('Fout bij het ophalen van recept op ID:', error);
      return null;
    }
  };
  export const getRecipesByUserId = async (userId: Types.ObjectId): Promise<RecipeDocument[]> => {
    try {
      const recipes = await Recipe.find({ userId });
      return recipes;
    } catch (error) {
      console.error('Fout bij het ophalen van recepten voor gebruiker:', error);
      return [];
    }
  };
  export const getRecipesByTag = async (tag: string): Promise<RecipeDocument[]> => {
    try {
      const recipes = await Recipe.find({ tags: tag });
      return recipes;
    } catch (error) {
      console.error('Fout bij het ophalen van recepten op tag:', error);
      return [];
    }
  }; 
  export const getFeedRecipes = async (): Promise<RecipeDocument[]> => {
    try {
      const recipes = await Recipe.find({});
      return recipes;
    } catch (error) {
      console.error('Fout bij het ophalen van feed-recepten:', error);
      return [];
    }
  };
  export const createRecipe = async (args: any): Promise<RecipeDocument | null> => {
    try {
      console.log(args)
      const newRecipe = await Recipe.create(args);
      return newRecipe;
    } catch (error) {
      console.error('Fout bij het maken van recept:', error);
      return null;
    }
  };