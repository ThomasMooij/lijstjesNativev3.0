import mongoose, { Schema, Document } from 'mongoose';

export interface RecipeDocument extends Document {
    name: string;
    userId: mongoose.Types.ObjectId;
    savedIds: mongoose.Types.ObjectId[];
    description: string, 
    items: mongoose.Types.ObjectId[] 
    videoUrl: string;
    mainPicturePath: string;
    pictureArray: string[];
}

const RecipeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userId: { // ID of creator
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    savedIds: [{ // ID of all users that saved the recipe
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    }],
    videoUrl: {
        type: String,
        required: true
    },
    mainPicturePath: {
        type: String,
    },
    pictureArray: [{
        type: String,
    }]
});

const Recipe = mongoose.model<RecipeDocument>('Recipe', RecipeSchema);

export default Recipe;
