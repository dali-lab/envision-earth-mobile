import React, { useState } from 'react';
import { Button, Text, Image, View } from 'react-native';
import {
  MediaTypeOptions,
  ImagePickerResult,
  launchImageLibraryAsync,
} from 'expo-image-picker';
// import useAppDispatch from '../../hooks/useAppDispatch';

export interface IPhotoInput {
  fullUrl: string,
  fileName: string,
  buffer: string, // base64
}

const UploadImage = () => {
  // const dispatch = useAppDispatch();

  const [image, setImage] = useState<IPhotoInput | undefined>();

  const pickImage = async () => {
    let photo: ImagePickerResult;
    try {
      photo = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    } catch (e) {
      alert(
        'Unable to open camera. Ensure that you\'ve given the app permission.',
      );
      console.warn(
        'Unable to open camera. This may be because you\'re using the simulator.',
      );
      return;
    }

    if (photo?.cancelled === true) return;
    if (photo.uri && photo.fileName && photo.base64) {
      const parsedPhoto = {
        fullUrl: photo.uri,
        fileName: photo.fileName,
        buffer: photo.base64,
      };
      setImage(parsedPhoto);
    }
  };

  const sendImage = async () => {
    try {
      console.log(image);
      // await dispatch(addPhoto(image));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> 
        <Button title='Pick an image from camera roll' onPress={pickImage} />
        {(image) && <Image source={{ uri: image.fullUrl }} style={{ width: 200, height: 200 }} />}
        <Button title='Upload Image' onPress={sendImage} />
      </Text>
    </View>
  );
};

/*
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
  photoUploadContainer: {
    borderRightWidth: 2,
    borderRightColor: "#666666",
    paddingHorizontal: 24,
  },
  addedPhotosContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  photoAdder: {
    width: 120,
    height: 120,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#666666",
    borderWidth: 2,
    padding: 24,
  },
});
*/

export default UploadImage;
