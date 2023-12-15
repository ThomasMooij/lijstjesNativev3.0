import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../utils/colors';

interface Props {
  onPress: () => void;
}

const FriendsListButton: FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.friendsListButton} onPress={onPress}>
      <MaterialCommunityIcons name="account-group" size={24} color={colors.CONTRAST} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friendsListButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
  },
});

export default FriendsListButton;
