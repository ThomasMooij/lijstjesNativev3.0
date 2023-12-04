import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import Profile from "../screens/profile";
import AppSettings from "../screens/appSettings";


interface Props {
    loggedIn: boolean; 
  }
const TopNavigator: FC<Props>  = ({loggedIn}) => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { loggedIn ? <Stack.Screen name="Profile" component={Profile} /> : null }
        <Stack.Screen name="Settings" component={AppSettings} />
      </Stack.Navigator>
    );
  };

  export default TopNavigator