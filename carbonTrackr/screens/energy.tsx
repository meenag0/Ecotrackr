import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const BackIcon = (props) => (
  <Ionicons {...props} name='arrow-back' />
);

const electricityTypeData = [
  'Coal',
  'Natural Gas',
  'Petroleum',
]

export const EnergyScreen = ({ navigation }) => {


  const [typeElectricityIndex, settypeElectricityIndex] = React.useState<IndexPath>(new IndexPath(0));
  const typeElectricityValue = electricityTypeData[typeElectricityIndex.row];

  
  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 20;
        
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    try {

      // Update WizardStore state locally
      WizardStore.update((s) => {
        s.progress = 40;
        s.electricityUsage = data.electricityUsage;
        s.typeElectricity = typeElectricityIndex.row;
        s.naturalGasUsage = data.naturalGasUsage;
        s.lightUseTime = data.lightUseTime;
      });
  
      console.log("Updated WizardStore state:", WizardStore.getRawState());
  
      // Navigate to the 'Food' screen
      navigation.navigate('Food');
    } catch (error) {
      console.error('Error updating WizardStore state or navigating to the Food screen:', error);
      // Handle error 
    }
  };
  

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  const renderOption = (title, index): React.ReactElement => (
    <SelectItem key={index} title={title} />
  );
  
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


          {/* input for avg electricityUsage (electricityUsage) */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="How much electricity do you use per month?"
                  placeholder="Enter kWh"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="electricityUsage"
            />
            {renderError('electricityUsage')}
          </View>


          {/* drop down menu for type of electricity (typeElectricity) */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label={"What source of electricity do you use?"}
                placeholder='Active'
                value={typeElectricityValue}
                selectedIndex={typeElectricityIndex}
                onSelect={(index: IndexPath) => settypeElectricityIndex(index)}
              >
                {electricityTypeData.map((option, index) => renderOption(option, index))}
              </Select>
            )}
            name="typeElectricity"
            />
          </View>




          {/* input for natural gas usage (naturalGasUsage) */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="How much natural gas do you use per month?"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="naturalGasUsage"
            />
            {renderError('naturalGasUsage')}
          </View>
          

          {/* input for amount of time lights are on per day */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="How many hours are your lights on for per day?"
                  placeholder="Enter # of hours"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="lightUseTime"
            />
            {renderError('lightUseTime')}
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
