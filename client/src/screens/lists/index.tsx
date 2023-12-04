import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER_LISTS } from '../../graphql/queries';
import { ListType } from '../../@types/ListType';
import List from './List';

interface Props {}

const Lists: FC<Props> = props => {
  const userId = '6544bb812bd4e60dc13611d0'
  const { loading, error, data } = useQuery(GET_USER_LISTS, {
    variables: { userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const lists: ListType[] = data?.getAllLists || [];


  return (
    <View>
      {
        lists.map((list: ListType, index: number) => (
          <List list={list} key={index} />  
        ))
      }
    </View>
  )
}

export default Lists;