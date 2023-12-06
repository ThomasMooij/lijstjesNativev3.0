// List.tsx
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListType } from '../../@types/ListType';

interface Props {
  list: ListType;
  expanded: boolean;
}

const List: FC<Props> = ({ list, expanded }) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{list.title}</Text>
      {expanded && (
        <View style={styles.itemsContainer}>
          {/* Display items associated with the list */}
          {list.items?.map(item => (
            <Text key={item._id}>{item.name}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 10,
  },
});

export default List;
