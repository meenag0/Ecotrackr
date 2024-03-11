import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import HomeScreen from "../tabs/HomeScreen";
import { Ionicons } from '@expo/vector-icons';

const BackIcon = (props) => (
  <Ionicons {...props} name='arrow-back' />
);

export const ShoppingScreen = ({ navigation }) => {

  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //navigating to energy page of form (next section)


  //
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) 
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 20;
        
      });
  }, [isFocused]);


  const onSubmit = (data) => {
    try {
      // Update WizardStore state with selected indexes
      WizardStore.update((s) => {
        s.progress = 40;
        s.fastFashion = fastFashionIndex.row;
        s.sustainableShoppingFrequency = sustainableShoppingFrequencyIndex.row;
        s.Recycling = RecyclingIndex.row;
      });
  
      // Log the index values
      console.log("Fast Fashion Index:", fastFashionIndex.row);
      console.log("Sustainable Shopping Frequency Index:", sustainableShoppingFrequencyIndex.row);
      console.log("Recycling Index:", RecyclingIndex.row);
  
      // Send the updated WizardStore data to the backend
      axios.post('http://10.0.0.192:8081', WizardStore.getRawState());
      console.log("WizardStore data sent to the backend successfully");
  
      // Navigate to the 'Home' screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting WizardStore data to backend:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  
  
 

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  
  const [fastFashionIndex, setFastFashionIndex] = React.useState<IndexPath>();
  const [sustainableShoppingFrequencyIndex, setSustainableShoppingFrequencyIndex] = React.useState<IndexPath >(); 
  const [RecyclingIndex, setRecyclingIndex] = React.useState<IndexPath>(); 

  
  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <Text style={styles.errorText}>
          This is a required field.
        </Text>
      );
    }
    return null;
  };

  return (


  <SafeAreaView style={{ flex: 1 }}>
  <TopNavigation title='More' alignment='center' accessoryLeft={BackAction}/>
  <Layout style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>

        <ProgressBar
          style={styles.progressBar}
          progress={WizardStore.getRawState().progress}
        />
        
        <Layout style={{ paddingHorizontal: 16 }}>



        {/* dropdown for Frequency of fastFashion shopping (fastFashionIndex) */}
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                // style={styles.select}
                label={"How often do you shop from fast fashion?"}
                placeholder='Active'
                onBlur={onBlur}
                selectedIndex={fastFashionIndex}
                onSelect={(index) => {
                  setFastFashionIndex(index as IndexPath);
                  onChange(index); 
                }}
              >
                <SelectItem title='Rarely' />
                <SelectItem title='Ocassionally' />
                <SelectItem title='Often' />
              </Select>
            )}
            name="fastFashion"
          />
          {renderError('fastFashion')}
        </View>

        {/* drop down menu for Average age of appliances */}
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                // style={styles.select}
                label={"How often do you shop sustainably?"}
                placeholder='Active'
                onBlur={onBlur}
                selectedIndex={sustainableShoppingFrequencyIndex}
                onSelect={(index) => {
                  setSustainableShoppingFrequencyIndex(index as IndexPath);
                  onChange(index); 
                }}
              >
                <SelectItem title='Rarely' />
                <SelectItem title='Ocassionally' />
                <SelectItem title='Often' />
              </Select>
            )}
            name="sustainableShoppingFrequency"
          />
          {renderError('sustainableShoppingFrequency')}
        </View>

        {/* drop down menu for Average age of appliances */}
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true, 
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                // style={styles.select}
                label={"How often do you recycle?"}
                placeholder='Active'
                onBlur={onBlur}
                selectedIndex={RecyclingIndex}
                onSelect={(index) => {
                  setRecyclingIndex(index as IndexPath);
                  onChange(index); 
                }}
              >
                <SelectItem title='Rarely' />
                <SelectItem title='Occasionally' />
                <SelectItem title='Often' />
              </Select>
            )}
            name="Recycling"
          />
          {renderError('Recycling')}
        </View>



    {/* next page button */}
    <Button
      onPress={handleSubmit(onSubmit)}
      style={styles.button}
    >
      GOTO STEP TWO
    </Button>
              
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  </Layout>
</SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    progressBar: {
      marginBottom: 16,
    },
    formEntry: {
      marginVertical: 8,
    },
    errorText: {
      marginLeft: 16,
      color: "red",
    },
    button: {
      marginVertical: 8,
    },

    select: {
      flex: 1,
      margin: 2,
    },
  });