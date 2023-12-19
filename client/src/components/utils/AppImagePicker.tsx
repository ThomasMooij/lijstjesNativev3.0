import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';

const AppImagePicker: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (!response.didCancel) {
        let imageUri = response.uri || (response.assets?.[0]?.uri ?? null);
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (!response.didCancel) {
        let imageUri = response.uri || (response.assets?.[0]?.uri ?? null);
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: '100%', height: 300 }}
          resizeMode="contain"
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </View>
  );
};

export default AppImagePicker;
