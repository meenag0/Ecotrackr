import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AboutScreen, HomeScreen } from './tabs/HomeScreen';
import { CalcScreen } from './screens/calc';

const { Navigator, Screen } = createStackNavigator();

// const HomeNavigator = ({navigation}) => (
//   <Navigator screenOptions={{headerShown: false} }>
//     <Screen name='About' component={AboutScreen} navigation={navigation}/>
//     <Screen name='Calc' component={CalcScreen} navigation={navigation}/>
//   </Navigator>
// );

export const AppNavigator = ({ navigation }) => (
  <Navigator screenOptions={{headerShown: false} }>
    <Screen name='HomeScreen' component={HomeScreen} navigation={navigation}/>
  </Navigator>
  );
