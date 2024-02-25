import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";


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
        s.progress = 0;
        
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 20;
      s.averageWeeklyMiles = data.averageWeeklyMiles;
      s.vehicleFuelEfficiency = data.vehicleFuelEfficiency;
      s.airTravelFrequency = data.airtravelFrequency;
      s.publicTransportationUsage = data.publicTransportationUsage;

    });
    console.log("Updated WizardStore state:", WizardStore.getRawState());
    navigation.navigate('Energy');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [vehicleFuelEfficiencyIndex, setVehicleFuelEfficiencyIndex] = React.useState<IndexPath | IndexPath[]>();
  const [airTravelFrequencyIndex, setAirTravelFrequencyIndex] = React.useState<IndexPath | IndexPath[]>();  
  
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
  <TopNavigation title='Transportation' alignment='center' accessoryLeft={BackAction}/>
  <Layout style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>

        <ProgressBar
          style={styles.progressBar}
          progress={WizardStore.getRawState().progress}
        />
        
        <Layout style={{ paddingHorizontal: 16 }}>

          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <Input
                  label="Average Weekly Miles Driven"
                  placeholder="Enter miles"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="averageWeeklyMiles"
            />
            {renderError('averageWeeklyMiles')}
          </View>


          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}

              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label={"Type of vehicle fuel."}
                placeholder='Active'
                selectedIndex={vehicleFuelEfficiencyIndex}
                onSelect={(index) => {
                  setVehicleFuelEfficiencyIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            )}
            name="vehicleFuelEfficiency"
            />
            {renderError('vehicleFuelEfficiency')}
          </View>


          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}

              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label={"Air travel frequency"}
                placeholder='Active'
                selectedIndex={airTravelFrequencyIndex}
                onSelect={(index) => {
                  setAirTravelFrequencyIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            )}
            name="airTravelFrequency"
            />
            {renderError('airTravelFrequency')}
          </View>

          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <Input
                  label="Public Transportation Usage"
                  placeholder="Enter miles"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="publicTransportationUsage"
            />
            {renderError('publicTransportationUsage')}
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