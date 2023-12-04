import React, { FC } from 'react';
import { View, StyleSheet, Text, TextInputProps, StyleProp, ViewStyle, TextInput } from 'react-native';
import colors from '../../../utils/colors';
import { useFormikContext } from 'formik';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  multiline?: boolean; // New prop for multiline input
  numberOfLines?: number; // New prop for number of lines
}

const AuthInput: FC<Props> = (props) => {
  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched
  } = useFormikContext<{
    [key: string]: string;
  }>();

  const {
    label,
    placeholder,
    autoCapitalize,
    keyboardType,
    secureTextEntry,
    containerStyle,
    name,
    multiline,
    numberOfLines
  } = props;

  const errorMsg = touched[name] && errors[name] ? errors[name] : '';

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        value={values[name]}
        onBlur={handleBlur(name)}
        multiline={multiline} 
        numberOfLines={5} 
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    color: colors.CONTRAST,
  },
  errorMsg: {
    color: colors.ERROR,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default AuthInput;
