import React from 'react';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Text, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { CalcScreen } from '../screens/calc';

const HomeScreen = ({ navigation, route }) => {

  const { totalEmissions } = route.params || {}; // Access totalEmissions from route.params

  const navigateDetails = () => {
    navigation.navigate('Calc');
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, position: 'absolute', top: 20, left: 20 }}>
        Total Emissions: {totalEmissions}
        </Text>

        <Button onPress={navigateDetails}>Calculate carbon footprint.</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen
