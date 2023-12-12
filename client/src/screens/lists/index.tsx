import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLink from '../../components/utils/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_USER_LISTS } from '../../graphql/queries';
import { ItemType } from '../../@types/ItemType';
import { ListType } from '../../@types/ListType';

interface ListResponse {
  getAllLists: ListType[];
}

const Lists: FC = () => {
  const userId = '6570be040604e11dbed840ec'; 
  const { loading, error, data } = useQuery<ListResponse>(GET_USER_LISTS, {
    variables: { userId },
  });

  console.log('data:', data);

  const [expandedList, setExpandedList] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const lists = data?.getAllLists || [];

  console.log('lists:', lists);

  return (
    <View style={styles.container}>
    <View style={styles.listsContainer}>
      <Text style={styles.pageTitle}>Your Lists</Text>
      {lists.map((list) => (
        <TouchableOpacity
          key={list._id}
          style={[
            styles.listContainer,
            expandedList === list._id && styles.expandedListContainer,
          ]}
          onPress={() => setExpandedList(expandedList === list._id ? null : list._id)}
        >
          <Text style={styles.listTitle}>{list.title}</Text>
          {expandedList === list._id && (
            <View style={styles.expandedContent}>
              <View style={styles.itemsContainer}>
                {/* Render items for the expanded list */}
                {list.items && list.items.length > 0 ? (
                  list.items.map((item) => (
                    <Text key={item._id} style={styles.itemText}>
                      {item.name}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>NO ITEMS ON THE LIST</Text>
                )}
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text>Add item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text>Add a friend</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
    {/* Bottom right buttons */}
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateRecipe')}>
        <MaterialCommunityIcons name="plus" size={24} color={colors.PRIMARY} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.friendButton} onPress={() => navigation.navigate('FriendsRecipes')}>
        <MaterialCommunityIcons name="account-group" size={24} color={colors.PRIMARY} />
      </TouchableOpacity>
    </View>
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
  listsContainer: {
    marginBottom: 20,
  },
  listContainer: {
    width: '70%',
    backgroundColor: colors.SECONDARY,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedListContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
  },
  listTitle: {
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
  itemsContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  itemText: {
    color: colors.CONTRAST,
    fontSize: 16,
    marginTop: 5,
  },
  noItemsText: {
    color: colors.CONTRAST,
    fontSize: 16,
    marginTop: 5,
    fontStyle: 'italic',
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
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  addButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: colors.SECONDARY,
    marginRight: 10,
  },
  friendButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: colors.SECONDARY,
  },
});

export default Lists;
