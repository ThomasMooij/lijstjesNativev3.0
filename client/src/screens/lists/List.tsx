import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { ListType } from '../../@types/ListType';

interface ListProps {
  list: ListType;  
}

const List: FC<ListProps> = ({ list }) => {

  return (
    <View>
      <Text>{list.title}</Text>   
    </View>
  );
};

export default List;
