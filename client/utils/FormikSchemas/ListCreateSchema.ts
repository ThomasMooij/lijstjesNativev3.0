import * as yup from 'yup';
import mongoose from 'mongoose';

// Custom Yup validation function for Mongoose ObjectId
const isValidObjectId = (value : any) =>
  mongoose.Types.ObjectId.isValid(value);

export const ListCreateSchema = yup.object({
  title: yup.string().required('Recipe title is required'),
  userId: yup.string().required('You have to be logged in').test(
    'valid-mongoose-id',
    'Invalid Mongoose ObjectId',
    isValidObjectId
  ),
  description: yup.string(),
  videoUrl: yup.string().required('Video URL is required').url('Enter a valid URL'),
  participants: yup.array().of(yup.string().test(
    'valid-mongoose-id',
    'Invalid Mongoose ObjectId',
    isValidObjectId
  )),
  items: yup.array().of(yup.string().test(
    'valid-mongoose-id',
    'Invalid Mongoose ObjectId',
    isValidObjectId
  )),
});
