import { ListType } from "./ListType";
import { RecipeType } from "./RecipeType";

export interface UserType{  
        _id: string
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        verified: boolean;
        picturePath: string;
        friends: UserType[],
        lists: ListType[],
        recipes: RecipeType[],
        savedListsIds:ListType[],
        savedRecipesIds: RecipeType[],
}