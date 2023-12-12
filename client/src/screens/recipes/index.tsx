import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../utils/colors'; // Importing colors file
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLink from '../../components/utils/AppLink';
import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../../graphql/queries';
import { RecipeType } from '../../@types/RecipeType';

interface RecipeResponse {
  getUserRecipes: RecipeType[];
}

const Recipes: FC = () => {
  const getUserRecipesId = '6570be040604e11dbed840ec';
  const { loading, error, data } = useQuery<RecipeResponse>(GET_USER_RECIPES , {
    variables: { userId: getUserRecipesId }
  });

  console.log('Data:', data);

  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const recipes = data?.getUserRecipes || [];

  const renderButtons = (recipeId: string) => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.updateButton}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.CONTRAST} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialCommunityIcons name="delete" size={20} color={colors.CONTRAST} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipesContainer}>
        <Text style={styles.sectionTitle}>Your Recipes</Text>
        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe._id}
            style={[
              styles.recipeContainer,
              expandedRecipe === recipe._id && styles.expandedRecipeContainer,
            ]}
            onPress={() => setExpandedRecipe(expandedRecipe === recipe._id ? null : recipe._id)}
          >
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeTitle}>{recipe.name}</Text>
              <View style={styles.titleButtonsContainer}>
                <TouchableOpacity style={styles.updateButton}>
                  <MaterialCommunityIcons name="pencil" size={20} color={colors.CONTRAST} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <MaterialCommunityIcons name="delete" size={20} color={colors.CONTRAST} />
                </TouchableOpacity>
              </View>
            </View>
            {expandedRecipe === recipe._id && (
              <View style={styles.itemsContainer}>
                {recipe.items && recipe.items.length > 0 ? (
                  recipe.items.map((item) => <Text key={item._id}>{item.name}</Text>)
                ) : (
                  <Text>No items on the list</Text>
                )}
                <View style={styles.bottomButtonsContainer}>
                  <TouchableOpacity style={styles.addListButton}>
                    <Text>Add to List</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postButton}>
                    <Text>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recipesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.CONTRAST,
  },
  recipeContainer: {
    backgroundColor: colors.SECONDARY,
    padding: 10,
    marginBottom: 10,
  },
  expandedRecipeContainer: {
    backgroundColor: colors.OVERLAY,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.CONTRAST,
  },
  titleButtonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addListButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  postButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  updateButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  itemsContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderTopColor: colors.INACTIVE_CONTRAST,
  },
});

export default Recipes;
