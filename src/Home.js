
import { View, Text, Image, StyleSheet } from 'react-native';
import Background from './Background';
import BTN from './btn';
import { darkgreen, yellow } from './constants';

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>

        <Image
          style={styles.image}
          source={require('../assets/Welcome.png')}
        />
        <Text style={styles.title}> To Our App</Text>
        <Text style={styles.subtitle}>
          Here you can find all the information you need
        </Text>
        {/* <Text style={{color:'black',fontSize:64}}>Welcome</Text> */}
        <BTN bgColor={darkgreen} textColor='white' btnLabel='LogIn' Press={() => props.navigation.navigate("login")} ></BTN>
        <BTN style={styles.sinup} bgColor='#f4faf2' textColor={darkgreen} btnLabel='SignUp' Press={() => props.navigation.navigate('SignUp')}></BTN>

        <Text style={styles.Greet}>Have a Great Day</Text>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  sinup:{
    borderColor:'green',
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:50,
    height:600,
    borderTopLeftRadius: 130,
    borderBottomRightRadius: 130,
    marginLeft:10,
    marginTop:150
  },
  image: {
    width: '70%',
    height: '20%',
    top:50
    // marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin:20,
    marginTop: 50,
  },
  Greet:{
    fontSize:15,
    fontWeight:'bold',
    color:'orange',
    marginTop: 50,
  }
});

export default Home;