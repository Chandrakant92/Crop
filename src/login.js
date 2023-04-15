import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';

import {darkgreen} from './constants';
import Field from './Field';
import BTN from './btn';
import FormInput from './FormInput'
import { useNavigation } from '@react-navigation/native';


const loginValidation = yup.object().shape({

  email:yup.string()
        .required('Email required')
        .email('Invalid email'),
  phone:yup.number()
      .typeError("Can't be Alphabet")
      .positive("can't start with a minus")
      .integer("can't include a decimal point")
      .min(8)
       .required('A phone number is required'),
 password:yup.string()
        .required('Password required')
        .min(4,'weak passward')
        .matches(/(?=.*[A-Z])\w{4,10}/,"strong password"),
})





// const navigation = useNavigation();



const Login = (props) => {

  const navigation = useNavigation();
  const openO=()=>{

    alert("Your redirect on OverView Page")
    navigation.navigate('Overview');
  }

  return (
    <Formik
    initialValues={{phone:'',password:'' }}
    validateOnMount={true}
    onSubmit={values => console.log(values)}
    validationSchema={loginValidation}
  >
    {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
    
    <Background>
      <View style={{alignItems: 'center', width: 400,  marginTop: 40,}}>
        <Text
          style={{
            color: 'green',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          LogIn
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 600,
            width: 350,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkgreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <View>
          <FormInput
                value={values.phone}
                error={touched.phone && errors.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                autoCapitalize='none'
                label='phone No.'
                placeholder='+91-###########'
              />
          <FormInput
                value={values.password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize='none'
                secureTextEntry
                label='Password'
                placeholder='********'
              />
             </View>
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 190}}>
            <Text style={{color: darkgreen, fontWeight: 'bold', fontSize: 16,marginTop:10}}>
              Forgot Password ?
            </Text>
          
          <BTN bgColor={darkgreen} textColor='white' btnLabel='login' Press={openO} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <Text style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>SignUp</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    </Background>
    )}
    </Formik>
  );
};

export default Login;