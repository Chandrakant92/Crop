import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ImagePage = ({ route, navigation }) => {
  const { photoUri } = route.params;
  const [isCameraVisible, setCameraVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isCameraVisible) {
        // If camera is visible, prevent default behavior of leaving the screen
        e.preventDefault();

        // Set cameraVisible to false and navigate back to Dummy
        setCameraVisible(false);
        navigation.goBack();
      }
    });

    return unsubscribe;
  }, [navigation, isCameraVisible]);

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleSavePhoto = async () => {
    try {
      // Make an API call to your backend server with the image data
      const response = await fetch('https://example.com/save-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoUri,
        }),
      });
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={{ width: 300, height: 400 }} />

      <TouchableOpacity style={styles.button} onPress={handleSavePhoto}>
        <Text style={styles.buttonText}>Send Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

// style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 18,
    shadowOffset: { width: 4, height: 8 },
    shadowColor: 'blue',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImagePage;
