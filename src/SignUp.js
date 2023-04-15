import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity,Button } from 'react-native';
import Background from './Background';
import { darkgreen } from './constants';
import Field from './Field';
import BTN from './btn';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormInput from './FormInput';


const loginValidation = yup.object().shape({

  Fullname: yup.string()
    .required('Name required')
    .trim()
    .min(4, 'name too short')
    .max(10, 'name is too large'),

  email: yup.string()
    .required('Email required')
    .email('Invalid email'),

  pass: yup.string()
    .required('pass required')
    .min(4, 'weak passward')
    .matches(/(?=.*[A-Z])\w{4,10}/, "strong pass"),

  Repass: yup.string()
    .equals(
      [yup.ref('pass'), null],
      "pass not match"
    )
    .required('Its requrired'),

  phone: yup.number()
    .typeError("Can't be Alphabet")
    .positive("can't start with a minus")
    .integer("can't include a decimal point")
    .min(8)
    .required('A phone number is required'),

})


const Signup = props => {
  
  const [user, setUser] = useState({
    Fullname: "",
    email: "",
    pass: "",
    Repass: ""
})


const handle = e => {

    const { name, value } = e.target
    // console.log(name, value);
    setUser({
        ...user,
        [name]: value
    })
}
// 
const register = () => {
    const { Fullname, email, pass, Repass } = user
    if (Fullname && email && pass && Repass) {
        // alert("Data uploaded successfully")
        if (pass === Repass) {
            axios.post("http://localhost:8008/register", user)
                .then(res =>
                    // console.log(res)
                    alert(res.data.message)
                )
        }
        else { alert("Pasward not match") }

    }

    else { alert("Enter valid details"); }
}

  return (
    <Formik
      initialValues={{ email: '', pass: '', Repass: '', phone: '', Fullname: '' }}
      validateOnMount={true}
      onSubmit={(values, formikActions) => { console.log(values)}}
      validationSchema={loginValidation}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
        <Background>
          <View style={{ alignItems: 'center', width: 400, marginTop: 20, }}>
            <Text
              style={{
                color: 'black',
                fontSize: 64,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Register
            </Text>
            <Text
              style={{
                color: 'green',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              Create a new account
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                height: 600,
                width: 350,
                borderTopLeftRadius: 130,
                paddingTop: 50,
                alignItems: 'center'

              }}>

              <View>
                <FormInput
                  value={values.Fullname}
                  error={touched.Fullname && errors.Fullname}
                  onChangeText={handleChange('Fullname')}
                  onChange={handle}
                  onBlur={handleBlur('Fullname')}
                  label='Full Name'
                  placeholder='John Smith'
                />
                <FormInput
                  value={values.email}
                  onChange={handle}
                  error={touched.email && errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize='none'
                  label='Email'
                  placeholder='example@email.com'
                />
                <FormInput
                  value={values.phone}
                  error={touched.phone && errors.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  autoCapitalize='none'
                  label='phone No.'
                  placeholder='+91-'
                />
                <FormInput
                  value={values.pass}
                  onChange={handle}
                  error={touched.pass && errors.pass}
                  onChangeText={handleChange('pass')}
                  onBlur={handleBlur('pass')}
                  autoCapitalize='none'
                  secureTextEntry
                  label='pass'
                  placeholder='********'
                />
                <FormInput
                  value={values.Repass}
                  onChange={handle}
                  error={touched.Repass && errors.Repass}
                  onChangeText={handleChange('Repass')}
                  onBlur={handleBlur('Repass')}
                  autoCapitalize='none'
                  secureTextEntry
                  label='Confirm pass'
                  placeholder='********'
                />
              </View >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '70%',
                  paddingRight: 16,

                }}>
                <Text style={{ color: 'grey', fontSize: 16 }}>
                  By signing in, you agree to our
                </Text>


              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: "center",
                  width: '78%',
                  paddingRight: 16,
                  marginBottom: 15
                }}>
                <Text style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>
                  Terms & Conditions{' '}
                </Text>
                <Text style={{ color: 'grey', fontSize: 16 }}>
                  and {" "}
                </Text>
                <Text style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>
                  Privacy Policy
                </Text>
              </View>
              <BTN
                textColor="white"
                bgColor={darkgreen}
                btnLabel="SignUp"
                Press={() => {
                    
                  alert('Account created');
                  props.navigation.navigate('login');
                }}
                
              />
              
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  Already have an account ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('login')}>
                  <Text
                    style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Background>
      )}
    </Formik>
  );
};

export default Signup;