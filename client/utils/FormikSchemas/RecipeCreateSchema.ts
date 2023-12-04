import * as yup from 'yup';

export const RecipeCreateSchema = yup.object({
  name: yup.string().required('Recipe name is required'),
  description: yup.string(),
  videoUrl: yup.string().required('Video URL is required').url('Enter a valid URL'),
});
