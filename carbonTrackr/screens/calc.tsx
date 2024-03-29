import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';



const BackIcon = (props) => (
  <Ionicons {...props} name='arrow-back' />
);

const publicTransportData = [
  "Rarely (2/month or less)",
  "Occasionally (3-5/month)",
  "Regularly (1/week or more)",
];

const carTypeData = [
  'Petrol', 
  'Diesel', 
  'Hybrid',
  'Electric',
  'None',
];

const carSizeData = [
  'Compact',
  'SUV',
  'Minivan',
  'Pickup Truck',
]

export const CalcScreen = ({ navigation }): React.ReactElement => {

  const [publicTransportFreqIndex, setPublicTransportFreqIndex] = React.useState<IndexPath>(new IndexPath(0));
  const [carSizeIndex, setCarSizeIndex] = React.useState<IndexPath>(new IndexPath(0));
  const [carTypeIndex, setCarTypeIndex] = React.useState<IndexPath>(new IndexPath(0));

  const publicTransportValue = publicTransportData[publicTransportFreqIndex.row];
  const carTypeValue = carTypeData[carTypeIndex.row]
  const carSizeValue = carSizeData[carSizeIndex.row]

  const renderOption = (title, index): React.ReactElement => (
    <SelectItem key={index} title={title} />
  );
  

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
  } = useForm();

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);


const onSubmit = (data) => {
  try {

    // Update WizardStore state locally
    WizardStore.update((s) => {
      s.progress = 20;
      s.averageWeeklyKm = data.averageWeeklyKm;
      s.publicTransportFreq = publicTransportFreqIndex.row;
      s.airTravelHours = data.airTravelHours;
      s.carSize = carSizeIndex.row;
      s.carType = carTypeIndex.row;
    });

    // Navigate to the 'Energy' screen
    navigation.navigate('Energy');
  } catch (error) {
    console.error('Error updating WizardStore state or navigating to the Energy screen:', error);
    // Handle error 
  }
};


  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };



  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      if (errors[fieldName].type === 'required') {
        return (
          <Text style={styles.errorText}>
            This is a required field.
          </Text>
        );
      }
    }
    return null;
  };

  return (

  <SafeAreaView style={{ flex: 1 }}>
  <TopNavigation title='Transportation' alignment='center' accessoryLeft={BackAction}/>
  <Layout style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>

        <ProgressBar
          style={styles.progressBar}
          progress={WizardStore.getRawState().progress}
        />
        
        <Layout style={{ paddingHorizontal: 16 }}>


          {/* dropdown for frequency of public transport (publicTransportFreq) */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label="How often do you use public transportation?"
                placeholder='Active'
                value={publicTransportValue}
                selectedIndex={publicTransportFreqIndex}
                onSelect={(index: IndexPath) => setPublicTransportFreqIndex(index)}
              >
                  {publicTransportData.map((option, index) => renderOption(option, index))}

              </Select>
            )}
            name="publicTransportFreq"
            />
          </View>


          <View style={styles.formEntry}>
          <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="How many hours do you travel via flight per year?"
                  placeholder="# of hours"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="airTravelHours"
            />
            {renderError('airTravelHours')}
          </View>

          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="How many km do you travel by car (on fuel) per week?"
                  placeholder="# of km"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="averageWeeklyKm"
            />
            {renderError('averageWeeklyKm')}
          </View>


          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label="What type of fuel does your car use?"
                placeholder='Active'
                value={carTypeValue}
                selectedIndex={carTypeIndex}
                onSelect={(index: IndexPath) => setCarTypeIndex(index)}
              >
                {carTypeData.map((option, index) => renderOption(option, index))}

              </Select>
            )}
            name="carType"
            />
          </View>


          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label="What type of car do you drive?"
                placeholder='Active'
                value={carSizeValue}
                selectedIndex={carSizeIndex}
                onSelect={(index: IndexPath) => setCarSizeIndex(index)}
              >
                {carSizeData.map((option, index) => renderOption(option, index))}

              </Select>
            )}
            name="carSize"
            />
          </View>          


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