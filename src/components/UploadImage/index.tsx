// Imported from old repo - major changes still needed

import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Text, Image, View } from 'react-native';
import AppButton from '../../components/AppButton';
import {
  useCameraPermissions,
  launchCameraAsync,
  ImagePickerResult,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import Colors from '../../utils/styles/Colors';

export interface IPhotoInput {
  uri: string,
  fileName: string,
  buffer: string, // base64
}

interface UploadImageProps {
  image: IPhotoInput | undefined,
  setImage: Dispatch<SetStateAction<IPhotoInput>>
}

const UploadImage = ({ image, setImage }: UploadImageProps) => {

  const [status, requestPermission] = useCameraPermissions();

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
      alert(e);
      return;
    }

    if (photo?.cancelled === true) return;
    if (photo) {
      const parsedPhoto = {
        uri: photo.uri as string,
        fileName: photo.fileName as string,
        buffer: photo.base64 as string,
      };
      setImage(parsedPhoto);
    }
  };

  const takeImage = useCallback(async () => {
    let photo: ImagePickerResult;
    try {
      if (!status) await requestPermission();
      photo = await launchCameraAsync({
        base64: true,
      });
    } catch (e) {
      alert(e);
      return;
    }
    if (photo?.cancelled === true) return;
    if (photo) {
      const parsedPhoto = {
        uri: photo.uri as string,
        fileName: photo.fileName as string,
        buffer: photo.base64 as string,
      };
      setImage(parsedPhoto);
    }
  }, [requestPermission, status]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        <AppButton
          onPress={pickImage}
          title={'pick from library'}
          backgroundColor={Colors.primary.lightGreen}
          textColor={Colors.primary.deepGreen}
          width={215}
          height={44}
        />
        <AppButton
          onPress={takeImage}
          title={'pick from camera'}
          backgroundColor={Colors.primary.lightOrange}
          textColor={Colors.primary.mainOrange}
          width={215}
          height={44}
        />
        {(image) && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      </Text>
    </View>
  );
};

export default UploadImage;
