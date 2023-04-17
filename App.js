import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Capture from './component/Capture';
// import Signup from './src/SignUp';
import Home from './src/Home';
import Login from './src/login';
import Signup from './src/SignUp';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="login" component={Login} /> */}
        {/* <Stack.Screen name="SignUp" component={Signup} /> */}
       <Stack.Screen name="Capture" component={Capture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
