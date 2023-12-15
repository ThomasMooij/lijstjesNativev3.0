import mongoose , { Error, Types } from "mongoose"
import Recipe, { RecipeDocument } from '../models/Recipe';
import User from "../models/User";

  export const getRecipeById = async (id: Types.ObjectId): Promise<RecipeDocument | null> => {
    try {
      const recipe = await Recipe.findById(id);
      return recipe;
    } catch ({message}: any) {
      throw new Error('error getting recipe by Id:' + message)
    }
  };
  export const getRecipesByUserId = async (userId: Types.ObjectId): Promise<RecipeDocument[]> => {
    try {
      const recipes = await Recipe.find({ userId });
      return recipes;
    } catch ({message}: any) {
      throw new Error('error getting recipe by user Id:' + message)
    }
  };

  export const createRecipe = async (input: RecipeDocument): Promise<RecipeDocument | null> => {
    try {
      const { name, userId, savedIds, items, videoUrl, mainPicturePath, pictureArray } = input;

      //IF USERID IS LOGGEDIN USER AND SUCH
      console.log(name)

      const newRecipe = await Recipe.create({
        name,
        userId,
        savedIds,
        items,
        videoUrl, 
        mainPicturePath,
        pictureArray
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { recipes: newRecipe._id  } },
        { new: true }
      );

      return newRecipe;
    } catch ({message}: any) {
      throw new Error('error getting recipe by Id:' + message)
    }
  };
 