import React from 'react';
import {TextInput} from 'react-native';
import {darkgreen} from './constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkgreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={darkgreen}></TextInput>
  );
};

export default Field;