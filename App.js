import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from './component/Overview';
import dummy from './component/dummy';
import ImagePage from './component/ImagePage';
import Pre from './component/pre';
// import Signup from './src/SignUp';
import Home from './src/Home';
import Login from './src/login';
import Signup from './src/SignUp';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Dummy" component={dummy} />
        <Stack.Screen name="ImagePage" component={ImagePage} />
        {/* <Stack.Screen name="Imagepage" component={ImagePage} /> */}
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
