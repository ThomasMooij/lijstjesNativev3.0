import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AuthInput from '../../components/Auth/AuthInput';
import SubmitBtn from '../../components/Auth/SubmitBtn';
import Form from '../../components/Form';
import AppLink from '../../components/utils/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
import colors from '../../../utils/colors';
import { RecipeCreateSchema } from '../../../utils/FormikSchemas/RecipeCreateSchema';
import AppImagePicker from '../../components/utils/AppImagePicker';

interface Props {}

const initialValues = {
  name: '',
  description: '',
  videoUrl: '',
};

const CreateRecipe: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={initialValues}
        validationSchema={RecipeCreateSchema} 
      >
        <View style={styles.formContainer}>
          <AuthInput
            name="name"
            placeholder="Recipe Name"
            label="Name"
            containerStyle={styles.marginBottom}
          />
          <AuthInput
            name="videoUrl"
            placeholder="Video URL"
            label="Video URL"
            containerStyle={styles.marginBottom}
          />
          <AuthInput
            name="description"
            placeholder="Description"
            label="Description"
            containerStyle={styles.marginBottom}
            multiline={true}
            numberOfLines={4} 
          />

          <ImagePickerComponent /> 

          <SubmitBtn title="Create Recipe" />
     
          <View style={styles.linkContainer}>
            <AppLink
              title="Go Back"
              onPress={() => {
                navigation.goBack();
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
    paddingHorizontal: 15,
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

export default CreateRecipe;
