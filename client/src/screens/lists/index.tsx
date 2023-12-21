import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../utils/colors'; // Importing colors file
import { useNavigation } from '@react-navigation/native';
import { ListType } from '../../@types/ListType';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_LISTS } from '../../graphql/queries';
import List from './List';
import CreateListButton from '../../components/utils/buttons/CreateListButton';
import FriendsListButton from '../../components/utils/buttons/FriendsListsButton';
import { ListProvider } from '../../context/ListContext';

interface ListResponse {
  getAllLists: ListType[];
}

const Lists: FC = () => {
  const userId = '6570be040604e11dbed840ec'; 
  const { loading, error, data, refetch } = useQuery<ListResponse>(GET_USER_LISTS, {
    variables: { userId },
  });

  const [expandedList, setExpandedList] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleCreateListPress = () => {
    navigation.navigate('CreateList');
  };

  const handleFriendsListPress = () => {
    navigation.navigate('FriendsLists');
  };

  const lists = data?.getAllLists || [];

  const refetchLists = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refetching lists:', error);
    }
  };

  return (
    <ListProvider refetchLists={refetchLists}>
      <View style={styles.container}>
        <View style={styles.listsContainer}>
          <Text style={styles.sectionTitle}>Your Lists</Text>
          {lists.map((list) => (
            
              <List   
                key={list._id}
                list={list}
                expandedList={expandedList}
                setExpandedList={setExpandedList}
              />
          
          ))}
        </View>
        <View style={styles.sideButtonsContainer}>
        <CreateListButton onPress={handleCreateListPress}/>
        <FriendsListButton onPress={handleFriendsListPress} />
        </View>
      </View>
    </ListProvider>
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
  listsContainer: {
    marginBottom: 20,
    width: '80%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.CONTRAST,
  },
  listContainer: {
    backgroundColor: colors.SECONDARY,
    padding: 10,
    marginBottom: 10,
  },
  expandedListContainer: {
    backgroundColor: colors.OVERLAY,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.CONTRAST,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addListButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  postButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.SECONDARY,
  },
  updateButton: {
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
  createListButton: {
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
});

export default Lists;
