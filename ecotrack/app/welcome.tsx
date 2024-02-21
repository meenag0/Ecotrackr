import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


interface SlideItem {
  title: string;
  image: any; 
  text: string;
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },

  });
 
const slides = [
  {
    key: '1', 
    title: 'Welcome to MyApp',
    // image: require('./path/to/image1.png'), // Assuming the image path is correct
    text: 'This is the first slide of the introduction.',
  },
  {
    key: '2', 

    title: 'Explore Features',
    // image: require('./path/to/image2.png'),
    text: 'Discover all the amazing features of MyApp.',
  },
]; 





const AppIntroScreen: React.FC = () => {
    const navigation = useNavigation();

  const _renderItem = ({ item }: { item: SlideItem }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Image source={item.image} /> */}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons 
          name="search"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
        <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => navigation.navigate('home')}
      >
        <Ionicons
          name="search"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </TouchableOpacity>
    );
  }
    return (
        <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />  
    );
  }
  export default function App() {
    return (
        <AppIntroScreen />
    );
  }