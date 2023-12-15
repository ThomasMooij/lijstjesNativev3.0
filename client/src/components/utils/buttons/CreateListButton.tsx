import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../utils/colors';

interface Props {
  onPress: () => void;
}

const CreateListButton: FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.createListButton} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={24} color={colors.CONTRAST} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createListButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
  },
});

export default CreateListButton;
