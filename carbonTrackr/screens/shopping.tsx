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
  <Ionicons {...props} name='arrow-back' style={{ color: '#FFFFFF' }} />
);

const fastFashionData = [
  'Rarely',
  'Ocassionaly',
  'Often',
]

const sustainableShoppingData = [
  'Rarely',
  'Ocassionaly',
  'Often',
]

const recyclingData = [
  'Rarely',
  'Ocassionaly',
  'Often',
]

export const ShoppingScreen = ({ navigation }) => {

  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );


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


// Function to handle form submission
const onSubmit = async (data) => {
  try {
    // Update WizardStore state with selected indexes
    WizardStore.update((s) => {
      s.progress = 40;
      s.fastFashion = fastFashionIndex.row;
      s.sustainableShoppingFrequency = sustainableShoppingFrequencyIndex.row;
      s.Recycling = RecyclingIndex.row;
    });

    console.log(WizardStore)

    // Send the updated WizardStore data to the backend
    const response = await axios.post('http://localhost:8000', {
      WizardStore
    });
    
    console.log("Response from backend:", response.data); // Log the entire response data

    // Extract total emissions from the response
    const totalEmissions = response.data.total_emissions;

    console.log("Response from backend:", response.data); // Log the entire response data

    // Update state with the calculated total emissions
    WizardStore.update((s) => {
      s.totalEmissions = totalEmissions;
    });
    console.log("Total emissions received from backend:", totalEmissions);

    // Navigate to the Home screen
    navigation.navigate('Home', { totalEmissions });
  } catch (error) {
    console.error('Error submitting WizardStore data to backend:', error);
    if (error.response) {
      // If the error includes a response object, log the response data
      console.log('Response data:', error.response.data);
    }

    // Handle error (e.g., display an error message to the user)
  }
};

  
  
 

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  
  const [fastFashionIndex, setFastFashionIndex] = React.useState<IndexPath>(new IndexPath(0));
  const [sustainableShoppingFrequencyIndex, setSustainableShoppingFrequencyIndex] = React.useState<IndexPath >(new IndexPath(0)); 
  const [RecyclingIndex, setRecyclingIndex] = React.useState<IndexPath>(new IndexPath(0)); 

  const fastFashionValue = fastFashionData[fastFashionIndex.row];
  const sustainableShoppingFrequencyValue = sustainableShoppingData[sustainableShoppingFrequencyIndex.row]
  const recyclingValue = recyclingData[RecyclingIndex.row]


  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );
  


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
            render={({ field: { value } }) => (
              <Select
                // style={styles.select}
                label={"How often do you shop from fast fashion?"}
                placeholder='Active'
                value={fastFashionValue}
                selectedIndex={fastFashionIndex}
                onSelect={(index: IndexPath) => setFastFashionIndex(index)}
              >
              {fastFashionData.map((title, index) => renderOption(title, index))}
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
                value={sustainableShoppingFrequencyValue}
                selectedIndex={sustainableShoppingFrequencyIndex}
                onSelect={(index: IndexPath) => setSustainableShoppingFrequencyIndex(index)}
              >
                {sustainableShoppingData.map((title, index) => renderOption(title, index))}

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
                value={recyclingValue}
                selectedIndex={RecyclingIndex}
                onSelect={(index: IndexPath) => setRecyclingIndex(index)}
              >
                {recyclingData.map((title, index) => renderOption(title, index))}

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