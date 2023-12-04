import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLink from '../../components/utils/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  // Add more fields as needed
}

const Recipes: FC = () => {
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const navigation = useNavigation<any>();

  const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Recipe 1',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
    },
    {
      id: 2,
      title: 'Recipe 2',
      ingredients: ['Ingredient 3', 'Ingredient 4'],
    },
    // Add more recipe objects
  ];

  const toggleRecipe = (recipeId: number) => {
    setExpandedRecipe((prevId) => (prevId === recipeId ? null : recipeId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your recipes</Text>
      {recipes.map((recipe) => (
        <TouchableOpacity
          key={recipe.id}
          style={[
            styles.recipeContainer,
            expandedRecipe === recipe.id && styles.expandedRecipeContainer,
          ]}
          onPress={() => toggleRecipe(recipe.id)}
        >
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          {/* Arrow icon to indicate expand/collapse */}
          <Text>{expandedRecipe === recipe.id ? '▲' : '▼'}</Text>
          {expandedRecipe === recipe.id && (
            <View style={styles.expandedContent}>
              <View style={styles.ingredientsContainer}>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredient}>
                    {ingredient}
                  </Text>
                ))}
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text>Add to list</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                <Text>Post!</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <AppLink 
          title='Post!' 
          onPress={()=> {
            navigation.navigate('CreateRecipe')
          }} /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.CONTRAST,
    marginBottom: 20,
  },
  recipeContainer: {
    width: '70%', // Width increased to occupy 70% of the screen
    backgroundColor: colors.SECONDARY,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedRecipeContainer: {
    flexDirection: 'column',
    alignItems: 'center', 
  },
  recipeTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center', 
  },
  expandedContent: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  ingredientsContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  ingredient: {
    color: colors.CONTRAST,
    fontSize: 16,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 15,
    borderRadius: 30,
    backgroundColor: colors.SECONDARY,
  },
});

export default Recipes;
