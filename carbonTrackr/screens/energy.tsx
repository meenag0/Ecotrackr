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
  // const toFood = () => {
  //   navigation.navigate('Food');
  // };

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
      s.naturalGasUsage = data.naturalGasUsage;
      s.lightUseTime = data.lightUseTime;
      s.typeElectricity = data.typeElectricity;

    });
    console.log("Updated WizardStore state:", WizardStore.getRawState());
    navigation.navigate('Food');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [typeElectricityIndex, settypeElectricityIndex] = React.useState<IndexPath | IndexPath[]>(); 

  
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
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label={"What source of electricity do you use?"}
                placeholder='Active'
                selectedIndex={typeElectricityIndex}
                onSelect={(index) => {
                  settypeElectricityIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Coal' />
                <SelectItem title='Natural gas' />
                <SelectItem title='Petroleum' />
              </Select>
            )}
            name="typeElectricity"
            />
            {renderError('typeElectricity')}
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
