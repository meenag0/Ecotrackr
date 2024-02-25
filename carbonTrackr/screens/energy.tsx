import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const EnergyScreen = ({ navigation }) => {

  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //navigating to energy page of form (next section)
  const toFood = () => {
    navigation.navigate('Food');
  };

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
    WizardStore.update((s) => {
      s.progress = 40;
      s.electricityUsage = data.electricityUsage;
      s.heatingUsage = data.heatingUsage;
      s.naturalGasUsage = data.naturalGasUsage;
      s.avgApplianceAge = data.avgApplianceAge;

    });
    console.log("Updated WizardStore state:", WizardStore.getRawState());
    navigation.navigate('Energy');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [vehicleFuelEfficiencyIndex, setVehicleFuelEfficiencyIndex] = React.useState<IndexPath | IndexPath[]>();
  const [avgApplianceAgeIndex, setavgApplianceAgeIndex] = React.useState<IndexPath | IndexPath[]>(); 

  
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


          // input for avg electricityUsage (electricityUsage)
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Average electricity usage"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="electricityUsage"
            />
            {renderError('electricityUsage')}
          </View>


          // dropdown for Type of vehicle fuel (vehicleFuelEfficiency)
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
                label={"Average age of appliances"}
                placeholder='Active'
                selectedIndex={avgApplianceAgeIndex}
                onSelect={(index) => {
                  setavgApplianceAgeIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            )}
            name="avgApplianceAge"
            />
            {renderError('avgApplianceAge')}
          </View>




          // input for cost of heating/ac (heatingUsage)
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Cost of heating/AC systems/month:"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="heatingUsage"
            />
            {renderError('heatingUsage')}
          </View>
          

          // input for cost of natural gas
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Cost of natural gas used per month:"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="naturalGasUsage"
            />
            {renderError('naturalGasUsage')}
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