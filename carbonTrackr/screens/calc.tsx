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

  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //navigating to energy page of form (next section)
  const toEnergy = () => {
    navigation.navigate('Energy');
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
      s.averageWeeklyKm = data.averageWeeklyKm;
      s.publicTransportFreq = data.publicTransportFreq;
      s.airTravelHours = data.airTravelHours;
      s.carSize = data.carSize;
      s.carType = data.CarType;
    });
    
    console.log("Updated WizardStore state:", WizardStore.getRawState());
    navigation.navigate('Energy');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [publicTransportFreqIndex, setpublicTransportFreqIndex] = React.useState<IndexPath | IndexPath[]>();
  const [carSizeIndex, setcarSizeIndex] = React.useState<IndexPath | IndexPath[]>();
  const [carTypeIndex, setCarTypeIndex] = React.useState<IndexPath | IndexPath[]>();

  
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


          {/* dropdown for frequency of public transport (publicTransportFreq) */}
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label="How often do you use public transportation?"
                placeholder='Active'
                selectedIndex={publicTransportFreqIndex}
                onSelect={(index) => {
                  setpublicTransportFreqIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title= "Rarely (2/month or less)" />
                <SelectItem title= "Occasionally (3-5/month)" />
                <SelectItem title= "Regularly (1/week or more)" />

              </Select>
            )}
            name="publicTransportFreq"
            />
            {renderError('publicTransportFreq')}
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
                  value={value}
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
                  value={value}
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
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label="What type of fuel does your car use?"
                placeholder='Active'
                selectedIndex={carTypeIndex}
                onSelect={(index) => {
                  setCarTypeIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Petrol' />
                <SelectItem title='Diesel' />
                <SelectItem title='Hybrid' />
                <SelectItem title='Electric' />
                <SelectItem title='None'/>
              </Select>
            )}
            name="carType"
            />
            {renderError('carType')}
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
                label="What type of car do you drive?"
                placeholder='Active'
                selectedIndex={carSizeIndex}
                onSelect={(index) => {
                  setcarSizeIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Compact' />
                <SelectItem title='SUV' />
                <SelectItem title='Minivan' />
                <SelectItem title='Pickup Truck' />
              </Select>
            )}
            name="carSize"
            />
            {renderError('carSize')}
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