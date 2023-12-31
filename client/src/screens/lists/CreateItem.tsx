import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CREATE_ITEM_MUTATION } from '../../graphql/itemQueries';
import { useMutation } from '@apollo/client';
import AppImagePicker from '../../components/utils/AppImagePicker';
import { useListContext } from '../../context/ListContext';

const CreateItem: FC = () => {
  const navigation = useNavigation();
  const userId = '6570be040604e11dbed840ec'; 
  const { refetchLists } = useListContext(); 

  const [ListName, setListName] = useState('');

  const [CreateItemMutation] = useMutation(CREATE_ITEM_MUTATION);

  const handleCreateItem = async () => {
    try {
      console.log("Submitting form with title:", ListName);

      await CreateItemMutation({
        variables: {
          input: {
            title: ListName,
            userId: userId,
          },
        },
      });
      refetchLists();
      navigation.goBack();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Lists name</Text>
        <TextInput
          placeholder="Enter list name"
          onChangeText={(text) => setListName(text)}
          value={ListName}
          style={styles.input}
        />

        <AppImagePicker />

        <TouchableOpacity onPress={handleCreateItem} style={styles.button}>
          <Text>Create item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default CreateItem;
