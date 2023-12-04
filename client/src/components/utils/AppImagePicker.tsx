import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

const ImagePickerComponent: FC = () => {
  const selectImage = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Handle the selected image URI or data here
        if (response.uri) {
          console.log('Selected Image:', response.uri);
          // You can store or further process the selected image data here
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text>Select Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});

export default ImagePickerComponent;
