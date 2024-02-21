import React from 'react';
import { Text, Button, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleGoToCalc = () => {
    router.push('/carboncalc/calc');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Calculator" onPress={handleGoToCalc} />
    </View>
  );
}