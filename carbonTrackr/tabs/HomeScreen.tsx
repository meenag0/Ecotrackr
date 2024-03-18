import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, Card, Button, Icon } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  let iconName;
  if (isCollapsed) {
    iconName = 'ios-arrow-down';
  } else {
    iconName = 'ios-arrow-up';
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text category="h6">Today</Text>
          <Button
            appearance="ghost"
            status="basic"
            onPress={toggleCollapse}
            accessoryLeft={props => (
              <Ionicons name={iconName} size={24} color="black" />
            )}
          />
        </View>
        {!isCollapsed && (
          <View style={{ padding: 8 }}>
            {}
            <Text>This is the collapsible box content.</Text>
          </View>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;