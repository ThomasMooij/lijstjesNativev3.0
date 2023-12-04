import { Document, ObjectId } from 'mongoose';
import { ItemDocument } from './ItemType';

export interface ListDocument extends Document {
    title: string;
    userId: string;
    participants: ObjectId[];
    items: ItemDocument[];
}
