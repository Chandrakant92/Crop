import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Dummy = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhotoUri(uri);
      console.log(uri);
      savePhotoToCameraRoll(uri);
      navigation.navigate('ImagePage', { photoUri: uri });
    }
  };

  const savePhotoToCameraRoll = async (photoUri) => {
    const asset = await MediaLibrary.createAssetAsync(photoUri);
    await MediaLibrary.createAlbumAsync('Expo', asset, false);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                top: 600,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
               
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={takePicture}>
              <Text  style={{ fontSize: 16 }}  > Snap </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-start',
                alignItems: 'center',
                top: 550,
              }}
              onPress={() => {
                if (photoUri) {
                  navigation.navigate('ImagePage', { photoUri: photoUri });
                } else {
                  console.log('No photo to display');
                }
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> View Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default Dummy;

const styles = StyleSheet.create({
  container: {
    height: 700,
    margin: 1,
  },
});
