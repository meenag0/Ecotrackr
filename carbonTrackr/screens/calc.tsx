import React from 'react';
import { SafeAreaView } from 'react-native';
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

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Transportation' alignment='center' accessoryLeft={BackAction}/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Input
      placeholder='Place your Text'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />


        <Button
        style={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'transparent' }}
        appearance='outline'
        onPress={toEnergy}
        accessoryLeft={(props) => <Icon {...props} name='arrow-forward'/>}
    />

        <Text >DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};