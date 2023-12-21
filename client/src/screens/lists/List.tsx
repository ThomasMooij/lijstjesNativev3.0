import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../utils/colors'; // Importing colors file
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListType } from '../../@types/ListType';
import { useNavigation } from '@react-navigation/native';
import { useListContext } from '../../context/ListContext';

interface Props {
  list: ListType; 
  expandedList: string | null; 
  setExpandedList: (listId: string | null) => void;
}

const List: FC<Props> = ({ list, expandedList, setExpandedList}) => {

  const {refetchLists} = useListContext();

  const navigation = useNavigation<any>();

  const handleCreateItem = async () => {
    navigation.navigate('CreateItem', { listId: list._id }); 
  }
  return (
    <TouchableOpacity
    key={list._id}
    style={[
      styles.listContainer,
      expandedList === list._id && styles.expandedListContainer,
    ]}
    onPress={() => setExpandedList(expandedList === list._id ? null : list._id)}
  >
    <View style={styles.listHeader}>
      <Text style={styles.listTitle}>{list.title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.updateButton}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.CONTRAST} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialCommunityIcons name="delete" size={20} color={colors.CONTRAST} />
        </TouchableOpacity>
      </View>
    </View>
    {expandedList === list._id && (
      <View style={styles.expandedContent}>
        <View style={styles.itemsContainer}>
          {list.items && list.items.length > 0 ? (
            list.items.map((item) => (
              <Text key={item._id} style={styles.itemText}>
                {item.name}
              </Text>
            ))
          ) : (
            <Text key="no-items" style={styles.noItemsText}>
              NO ITEMS ON THE LIST
            </Text>
          )}
        </View>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={handleCreateItem} style={styles.addListButton}>
            <Text>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton}>
            <Text>Add friend</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </TouchableOpacity>
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
    color: colors.SUCCESS
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

export default List;
