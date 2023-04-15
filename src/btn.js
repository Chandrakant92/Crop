import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

export default function BTN({bgColor,textColor,btnLabel,Press}) {
  return (
   <TouchableOpacity
   onPress={Press}
   
   style={{
    backgroundColor:bgColor,
    borderRadius:100,
    alignItems:'center',
    width:250,
    paddingVertical:5,
    marginVertical:4,
    marginTop:10
   }}>
    <Text style={{color:textColor ,fontSize:22,fontWeight:'bold'}}>
        {btnLabel}
    </Text>

   </TouchableOpacity>
  )
}