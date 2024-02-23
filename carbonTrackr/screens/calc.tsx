import React from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const CalcScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const toEnergy = () => {
    navigation.navigate('NextPage');
  };

  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(true); // State to track input validity

  const onChangeText = (newValue) => {
    // Regular expression to allow only numeric input
    const numericRegex = /^[0-9]*$/;
    setValue(newValue);
    setIsValid(numericRegex.test(newValue)); 
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Transportation' alignment='center' accessoryLeft={BackAction}/>
      <Layout style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Input
          keyboardType="numeric"
          placeholder="Enter a number"
          value={value}
          onChangeText={onChangeText}
          status={isValid ? 'basic' : 'danger'} // Set status based on input validity
          caption={isValid ? '' : 'Please enter a valid number'} // Display caption for validation message
        />

        <Button
        style={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'transparent' }}
        appearance='outline'
        onPress={toEnergy}
        accessoryLeft={(props) => <Icon {...props} name='arrow-forward'/>}
        disabled={!isValid} // Disable the button if input is invalid

    />

      </Layout>
      </TouchableWithoutFeedback>
      </Layout>

    </SafeAreaView>
  );
};