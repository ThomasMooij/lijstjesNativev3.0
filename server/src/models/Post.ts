import mongoose from "mongoose";

export interface Post {
    title: string,
    description: string, 
    userId: mongoose.Schema.Types.ObjectId,
    recipeId: mongoose.Schema.Types.ObjectId,
    tags: string[],
}