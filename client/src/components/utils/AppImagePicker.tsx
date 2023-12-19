import React, { FC, useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import ImagePicker, { ImagePickerResponse, ImagePickerOptions } from 'react-native-image-picker';
import colors from '../../../utils/colors'; // Importing colors file

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
}

const AppImagePicker: FC<ImagePickerProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await requestCameraPermission();
      }
    })();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const rationale: PermissionsAndroid.PermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access storage',
          message: 'App needs access to your storage to upload images.',
          buttonPositive: 'OK',
        }
      );

      if (rationale !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = () => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel && response.uri) {
        const pickedImage = response as ImagePickerResponse;
        setSelectedImage(pickedImage.uri);
        onImageSelected(pickedImage.uri); 
      }
    });
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      ) : (
        <Image source={require('../../assets/image-placeholder.png')} style={styles.imagePlaceholder} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.INACTIVE_CONTRAST,
    backgroundColor: colors.PRIMARY,
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    tintColor: colors.INACTIVE_CONTRAST,
  },
});

export default AppImagePicker;
