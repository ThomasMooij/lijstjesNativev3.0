import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AuthInput from '../../components/Auth/AuthInput';
import SubmitBtn from '../../components/Auth/SubmitBtn';
import Form from '../../components/Form';
import AppLink from '../../components/utils/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {StackParamList } from '../../@types/navigation';
import colors from '../../../utils/colors';
import AppImagePicker from '../../components/utils/AppImagePicker';
import { ListCreateSchema } from '../../../utils/FormikSchemas/ListCreateSchema';
import { CREATE_LIST_MUTATION } from '../../graphql/queries';
import { useMutation } from '@apollo/client';

interface Props {}

const initialValues = {
  name: '',
  description: '',
  videoUrl: '',
};

const CreateList: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const userId = '6570be040604e11dbed840ec'; 

  const [createListMutation] = useMutation(CREATE_LIST_MUTATION);

  const handleCreateList = async (values: any) => {
    try {
      console.log("create list function with values:", values)
    
      await createListMutation({
        variables: {
          input: {
            title: values.name,
            userId: userId,
          },
        },
      });
      navigation.goBack();
    }catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        onSubmit={values => {
          console.log("create list onSubmit with values:", values)
          handleCreateList(values)
        } }
        initialValues={initialValues}
        validationSchema={ListCreateSchema} 
      >
        <View style={styles.formContainer}>
          <AuthInput
            name="title"
            placeholder="Lists title"
            label="title"
            containerStyle={styles.marginBottom}
          />

          <SubmitBtn title="Create list" />
     
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

export default CreateList;
