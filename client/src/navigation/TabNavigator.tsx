import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../utils/colors';
import Feed from '../screens/feed';
import Lists from '../screens/lists';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Recipes from '../screens/recipes';
import CreateRecipe from '../screens/recipes/CreateRecipe';
import CreateList from '../screens/lists/CreateList';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: props => (
            <AntDesign name="home" size={props.size} color={props.color} />
          ),
          tabBarLabel: 'Feed',
        }}
      />
      <Tab.Screen
        name="Lists"
        component={Lists}
        options={{
          tabBarIcon: props => (
            <AntDesign name="carryout" size={props.size} color={props.color} />
          ),
          tabBarLabel: 'Lists',
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarIcon: props => (
            <AntDesign
              name="menu-fold"
              size={props.size}
              color={props.color}
            />
          ),
          tabBarLabel: 'Recipes',
        }}
      />
      {/* APP LINKS */}
      <Tab.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{
          tabBarButton: () => null, // Hide the tab button for CreateRecipe
        }} />
      <Tab.Screen
        name="CreateList"
        component={CreateList}
        options={{
          tabBarButton: () => null, // Hide the tab button for CreateRecipe
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
