import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';


const ImagePage = ({ route, navigation }) => {
  const { photoUri } = route.params;
  // console.log(photoUri);
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
    navigation.navigate('Dummy');
    navigation.navigate('Overview');
  };


  const submit = async () => {
    try {
      const response = await fetch(photoUri);
      const blob = await response.blob();
      console.log("======================================");
      console.log(blob,"   blob");
      console.log("=======================================");
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'CropApp');
  
      const res = await fetch('https://api.cloudinary.com/v1_1/djnzsplu3/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      console.log('Image uploaded to Cloudinary:');
      console.log("======================================");
      console.log(data.secure_url);
      console.log("=======================================");
      // Adding into database 
      await axios.post('http://localhost:3000/save-photo', { photoUri: data.secure_url })
      alert("Image is get added int the database. Thak You..!!");
      
    } catch (error) {
      console.error(error);
    }
  };
  

  // const handleUpload =(image)=>{
  //   const data =new FormData()
  //   data.append('file',image)
  //   data.append('upload_present','CropApp')
  //   data.append("cloude_name","djnzsplu3")

  //   fetch("https://api.cloudinary.com/v1_1/djnzsplu3/image/upload",{
  //     method:"post",
  //     body:data
  //   }).then(res=>res.json())
  //   then(data=>{
  //     console.log(data);
  //   })
  // }

  
//  **

  // const submit=async()=>{
  //   const data = await fetch('http://localhost:3000/save-photo', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       photoUri: `${photoUri}`
  //     })
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log('URL stored successfully');
  //     } else {
  //       console.error('Failed to store URL');
  //     }
  //     console.log(data)
  //   })
  //   .catch(error => {
  //     console.error('An error occurred', error);
  //   });

  // }


 

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={{ width: 300, height: 400 }} />

      <TouchableOpacity style={styles.button} onPress={submit}>
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
