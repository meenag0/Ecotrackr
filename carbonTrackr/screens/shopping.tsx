import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { HomeScreen } from "../tabs/HomeScreen";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
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

  const onSubmit = async (data) => {

      const response = await axios.post('http://127.0.0.1:8000', data);
      console.log("Calculation Result:", response.data);
  
      // Update WizardStore state and navigate
      WizardStore.update((s) => {
        s.progress = 40;
        s.fastFashion = data.fastFashion;
        s.sustainableShoppingFrequency = data.sustainableShoppingFrequency;
        s.Recycling = data.Recycling;
      });
      console.log("Updated WizardStore state:", WizardStore.getRawState());
      navigation.navigate('Home');
    }; 

 

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  
  const [fastFashionIndex, setFastFashionIndex] = React.useState<IndexPath | IndexPath[]>();
  const [sustainableShoppingFrequencyIndex, setSustainableShoppingFrequencyIndex] = React.useState<IndexPath | IndexPath[]>(); 
  const [RecyclingIndex, setRecyclingIndex] = React.useState<IndexPath | IndexPath[]>(); 

  
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



          // dropdown for Frequency of fastFashion shopping (fastFashionIndex)
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
                placeholder='Activecl'
                selectedIndex={fastFashionIndex}
                onSelect={(index) => {
                  setFastFashionIndex(index);
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




          // drop down menu for Average age of appliances
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
                selectedIndex={sustainableShoppingFrequencyIndex}
                onSelect={(index) => {
                  setSustainableShoppingFrequencyIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Rarely' />
                <SelectItem title='Ocassionally 2' />
                <SelectItem title='Often' />
              </Select>
            )}
            name="sustainableShoppingFrequency"
            />
            {renderError('sustainableShoppingFrequency')}
          </View>


          
          // drop down menu for Average age of appliances
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
                selectedIndex={RecyclingIndex}
                onSelect={(index) => {
                  setRecyclingIndex(index);
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


          // next page button
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