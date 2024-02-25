import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IndexPath, Input, Button, Select, SelectItem, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const FoodScreen = ({ navigation }) => {

  // click on back arrow button, go to last page
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //navigating to energy page of form (next section)
  const toShopping = () => {
    navigation.navigate('Shopping');
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
      s.redMeatConsumption = data.redMeatConsumption;
      s.localFoodPurchases = data.localFoodPurchases;
      s.processedFoodConsumption = data.processedFoodConsumption;
      s.dairyConsumption = data.dairyConsumption;
      s.seafoodConsumption = data.seafoodConsumption;


    });
    console.log("Updated WizardStore state:", WizardStore.getRawState());
    navigation.navigate('Shopping');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [localFoodPurchasesIndex, setlocalFoodPurchasesIndex] = React.useState<IndexPath | IndexPath[]>();
  const [processedFoodConsumptionIndex, setprocessedFoodConsumptionIndex] = React.useState<IndexPath | IndexPath[]>(); 

  
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


          // input for number of times red eat consumed per week (redMeatConsumption)
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Number of times red eat consumed per week"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="redMeatConsumption"
            />
            {renderError('redMeatConsumption')}
          </View>


          // dropdown for Type of vehicle fuel (localFoodPurchases)
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                // style={styles.select}
                label={"Frequency of local food purchasing"}
                placeholder='Active'
                selectedIndex={localFoodPurchasesIndex}
                onSelect={(index) => {
                  setlocalFoodPurchasesIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            )}
            name="localFoodPurchases"
            />
            {renderError('localFoodPurchases')}
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
                label={"Frequency of purchasing processed food"}
                placeholder='Active'
                selectedIndex={processedFoodConsumptionIndex}
                onSelect={(index) => {
                  setprocessedFoodConsumptionIndex(index);
                  onChange(index); 
                }}
              >
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            )}
            name="processedFoodConsumption"
            />
            {renderError('processedFoodConsumption')}
          </View>




          // input for Number of milk cartons bought per week (dairyConsumption)
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Number of milk cartons bought per week:"
                  placeholder="Enter #"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="dairyConsumption"
            />
            {renderError('dairyConsumption')}
          </View>
          
          
          // input for number of seafood meals
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Number of seafood meals:"
                  placeholder="Enter $"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="seafoodConsumption"
            />
            {renderError('seafoodConsumption')}
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