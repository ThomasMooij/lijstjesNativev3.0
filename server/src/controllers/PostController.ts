  // export const getRecipesByTag = async (tag: string): Promise<RecipeDocument[]> => {
  //   try {
  //     const recipes = await Recipe.find({ tags: tag });
  //     return recipes;
  //   } catch ({message} : any) {
  //     throw new Error('error getting recipe by Id:' + message)
  //   }
  // }; 
  // export const getFeedRecipes = async (): Promise<RecipeDocument[]> => {
  //   try {
  //     const recipes = await Recipe.find({});
  //     return recipes;
  //   } catch ({message}: any) {
  //     throw new Error('error getting recipe by Id:' + message)
  //   }
  // };