import colors from '../../../utils/colors';
import { FC, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AuthInput from '../../components/Auth/AuthInput';
import SubmitBtn from '../../components/Auth/SubmitBtn';
import Form from '../../components/Form';
import AppLink from '../../components/utils/AppLink';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
import { SignUpSchema } from '../../../utils/FormikSchemas/SignUpSchema';

interface Props {}

const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

    const SignUp: FC<Props> = props => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
      <SafeAreaView style={styles.container}>
        <Form
          onSubmit={values => {
            console.log(values);
          }}
          initialValues={initialValues}
          validationSchema={SignUpSchema}>
          <View style={styles.formContainer}>
            <AuthInput
              name="firstname"
              placeholder="Tummus"
              label="Firstname"
              containerStyle={styles.marginBottom}
            />
            <AuthInput
              name="lastname"
              placeholder="Doe"
              label="Lastname"
              containerStyle={styles.marginBottom}
            />
            <AuthInput
              name="email"
              placeholder="tummusinc@outlook.nl"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.marginBottom}
            />
            <AuthInput
              name="password"
              placeholder="********"
              label="Password"
              autoCapitalize="none"
              secureTextEntry
              containerStyle={styles.marginBottom}
            />
            <SubmitBtn title="Sign up" />
          <View style={styles.linkContainer}>
            <AppLink 
            title="I Lost My Password"
              onPress={() => {
                    navigation.navigate('LostPassword');
                }}
                />
            <AppLink 
            title="Sign in"
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

export default SignUp;
