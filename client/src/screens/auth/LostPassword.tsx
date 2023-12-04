import colors from '../../../utils/colors';
import { FC } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AuthInput from '../../components/Auth/AuthInput';
import * as yup from 'yup'
import SubmitBtn from '../../components/Auth/SubmitBtn';
import Form from '../../components/Form';
import AppLink from '../../components/utils/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
interface Props {}

const initialValues = {
    email: '',
  };

  const LostPasswordSchema = yup.object({
    email: yup
        .string()
        .trim('Name is missing')
        .email('Please provide a valid email')
        .required('You have to provide your email'),
  })
  

  const LostPassword: FC<Props> = props => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
      <SafeAreaView style={styles.container}>
        <Form
          onSubmit={values => {
            console.log(values);
          }}
          initialValues={initialValues}
          validationSchema={LostPasswordSchema}>
          <View style={styles.formContainer}>
            <AuthInput
              name="email"
              placeholder="tummusinc@outlook.nl"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.marginBottom}
            />
            <SubmitBtn title="Send link to email" />
          <View style={styles.linkContainer}>
            <AppLink title="Sign in"
              onPress={() => {
                    navigation.navigate('LostPassword');
                }}
            />
            <AppLink title="Sign up"
              onPress={() => {
                    navigation.navigate('SignUp');
                }}
            />
          </View>
          </View>
        </Form>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      width: '100%',
      paddingHorizontal: 15, // padding in the x direction (left and the right)
    },
    marginBottom: {
      marginBottom: 20,
    },
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });

export default LostPassword;
