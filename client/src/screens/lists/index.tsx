// Lists.tsx
import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER_LISTS } from '../../graphql/queries';
import { ItemType } from '../../@types/ItemType';

interface List {
  _id: string;
  title: string;
  date: string;
  items: ItemType[];
}

interface ListResponse {
  getAllLists: List[];
}

const Lists: FC = () => {
  const userId = '6544bb812bd4e60dc13611d0'; 
  const { loading, error, data } = useQuery<ListResponse>(GET_USER_LISTS, {
    variables: { userId },
  });
  const [expandedList, setExpandedList] = useState<string | null>(null);

console.log(data)

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const lists = data?.getAllLists || [];

  return (
    <View style={styles.container}>
      <View style={styles.listsContainer}>
        <Text style={styles.sectionTitle}>Your Lists</Text>
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
              <View style={styles.itemsContainer}>
                {/* Render items for the expanded list */}
                {/* Use FlatList or another component to display items */}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {/* Add Friends Lists section here */}
      {/* Add logic to display lists where user ID is part of participants */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
  },
  expandedListContainer: {
    backgroundColor: '#e0e0e0',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
 
});

export default Lists;
