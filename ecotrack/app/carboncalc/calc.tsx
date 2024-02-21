import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Calc = () => {
  const [inputs, setInputs] = useState({
    electricity: '',
    gas: '',
    water: '',
    transportation: '',
    waste: '',
  });

  const handleInputChange = (key: keyof typeof inputs, value: string) => {
    setInputs({ ...inputs, [key]: value });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Electricity Usage</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter electricity usage"
            keyboardType="numeric"
            value={inputs.electricity}
            onChangeText={(text) => handleInputChange('electricity', text)}
          />
        </View>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gas Usage</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gas usage"
          keyboardType="numeric"
          value={inputs.gas}
          onChangeText={(text) => handleInputChange('gas', text)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Water Usage</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter water usage"
          keyboardType="numeric"
          value={inputs.water}
          onChangeText={(text) => handleInputChange('water', text)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transportation Emissions</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter transportation emissions"
          keyboardType="numeric"
          value={inputs.transportation}
          onChangeText={(text) => handleInputChange('transportation', text)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Waste Generation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter waste generation"
          keyboardType="numeric"
          value={inputs.waste}
          onChangeText={(text) => handleInputChange('waste', text)}
        />
      </View>
        <Button title="Calculate Carbon Footprint" onPress={() => console.log(inputs)} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default Calc;
