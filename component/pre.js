import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Pre = ({ route }) => {
    const { photo } = route.params;
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />
      </View>
    );
  }
  

export default Pre

const styles = StyleSheet.create({
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
})