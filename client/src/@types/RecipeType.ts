import { ItemType } from "./ItemType";
import { UserType } from "./UserType";

export interface RecipeType{
    _id: string;
    name: string;
    userId: UserType;
    savedIds: UserType[];
    description: string, 
    items: ItemType[] 
    videoUrl: string;
    mainPicturePath: string;
    pictureArray: string[];
}
