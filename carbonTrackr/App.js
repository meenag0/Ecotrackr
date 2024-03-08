import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressScreen from './tabs/ProgressScreen';
import ProfileScreen from './tabs/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppNavigator } from './navStack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { CalcScreen } from './screens/calc';
import { EnergyScreen } from './screens/energy';
import { FoodScreen } from './screens/food';
import { ShoppingScreen } from './screens/shopping';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelPosition: 'below-icon',
      tabBarActiveTintColor: 'purple',
      tabBarLabel: '',
    }}>
    <Tab.Screen
      name="Home"
      component={AppNavigator}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => <Ionicons name={'home'} size={20} />,
      }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{
        tabBarLabel: 'Progress',
        tabBarIcon: () => <Ionicons name={'graph'} size={20} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: () => <Ionicons name={'person'} size={20} />,
      }}
    />
    <Tab.Screen
      name="Habits"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Habits',
        tabBarIcon: () => <Ionicons name={'person'} size={20} />,
      }}
    />
  </Tab.Navigator>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Calc" component={CalcScreen} />
          <Stack.Screen name="Energy" component={EnergyScreen}/>
          <Stack.Screen name="Food" component={FoodScreen}/>
          <Stack.Screen name="Shopping" component={ShoppingScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
