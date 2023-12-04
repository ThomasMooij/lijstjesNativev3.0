import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LostPassword from '../screens/auth/LostPassword';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Verification from '../screens/auth/Verification';
import { AuthStackParamList } from '../@types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
