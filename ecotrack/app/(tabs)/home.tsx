import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const Home = () => {
  const [inputs, setInputs] = useState({
    electricity: '',
    gas: '',
    water: '',
    transportation: '',
    waste: '',
  });

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      // Send inputs to API to calculate carbon footprint
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      // Handle the response from the API
      Alert.alert('Success', `Your carbon footprint is ${data.carbonFootprint}`);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate carbon footprint. Please try again later.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Electricity usage"
        keyboardType="numeric"
        value={inputs.electricity}
        onChangeText={(text) => handleInputChange('electricity', text)}
      />
      <TextInput
        placeholder="Gas usage"
        keyboardType="numeric"
        value={inputs.gas}
        onChangeText={(text) => handleInputChange('gas', text)}
      />
      <TextInput
        placeholder="Water usage"
        keyboardType="numeric"
        value={inputs.water}
        onChangeText={(text) => handleInputChange('water', text)}
      />
      <TextInput
        placeholder="Transportation emissions"
        keyboardType="numeric"
        value={inputs.transportation}
        onChangeText={(text) => handleInputChange('transportation', text)}
      />
      <TextInput
        placeholder="Waste generation"
        keyboardType="numeric"
        value={inputs.waste}
        onChangeText={(text) => handleInputChange('waste', text)}
      />
      <Button title="Calculate Carbon Footprint" onPress={handleSubmit} />
    </View>
  );
}

export default Home;