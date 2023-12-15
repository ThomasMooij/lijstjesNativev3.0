import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../utils/colors'; // Importing colors file
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../../graphql/queries';
import { RecipeType } from '../../@types/RecipeType';
import { useNavigation } from '@react-navigation/native';

interface RecipeResponse {
  getUserRecipes: RecipeType[];
}

const Recipes: FC = () => {
  const getUserRecipesId = '6570be040604e11dbed840ec';
  const { loading, error, data } = useQuery<RecipeResponse>(GET_USER_RECIPES, {
    variables: { userId: getUserRecipesId }
  });

  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const recipes = data?.getUserRecipes || [];

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
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.updateRecipeButton}>
                  <MaterialCommunityIcons name="pencil" size={20} color={colors.CONTRAST} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <MaterialCommunityIcons name="delete" size={20} color={colors.CONTRAST} />
                </TouchableOpacity>
              </View>
            </View>
            {expandedRecipe === recipe._id && (
              <View style={styles.expandedContent}>
                <View style={styles.itemsContainer}>
                  {recipe.items && recipe.items.length > 0 ? (
                    recipe.items.map((ingredient, index) => (
                      <Text key={index} style={styles.itemText}>
                        {ingredient.name}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.noItemsText}>NO items IN THE RECIPE</Text>
                  )}
                </View>
                <View style={styles.container}>
                  <TouchableOpacity style={styles.addRecipeButton}>
                    <Text>Add Ingredient</Text>
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
      <View style={styles.sideButtonsContainer}>
        <TouchableOpacity style={styles.createRecipeButton} onPress={() => navigation.navigate('CreateRecipe')}>
          <MaterialCommunityIcons name="plus" size={24} color={colors.CONTRAST} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.friendsListButton} onPress={() => navigation.navigate('FriendsList')}>
          <MaterialCommunityIcons name="account-group" size={24} color={colors.CONTRAST} />
        </TouchableOpacity>
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
    flexDirection: 'row',
  },
  recipesContainer: {
    marginBottom: 20,
    width: '80%',
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
  addRecipeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  postButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  updateRecipeButton: {
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
  expandedContent: {
    // Define your expanded content styles here
  },
  itemText: {
    // Define your item text styles here
  },
  noItemsText: {
    // Define your no items text styles here
  },
  sideButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  createRecipeButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
  },
  friendsListButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default Recipes;