import { ItemType } from "./ItemType";

export interface ListType {
    id: string;
    title: string;
    items?: ItemType[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}