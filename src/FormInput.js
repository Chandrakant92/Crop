import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const FormInput = props => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={{ color: 'green',fontWeight: 'bold' }}>{label}</Text>
        {error ? (
          <Text style={{ color: 'red', fontWeight: 'bold',fontSize: 12 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'green',
    height: 25,
    width:250,
    borderRadius: 5,
    fontSize: 10,
    paddingLeft: 10,
    marginBottom: 5,
  },
});

export default FormInput;