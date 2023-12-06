import { ItemType } from "./ItemType";

export interface ListType {
    _id: string;
    title: string;
    items?: ItemType[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}