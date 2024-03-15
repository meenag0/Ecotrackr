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

const localFoodData = [
  'Rarely',
  'Ocassionaly',
  'Often',
]

export const FoodScreen = ({ navigation }) => {


  const [localFoodPurchasesIndex, setlocalFoodPurchasesIndex] = React.useState<IndexPath>(new IndexPath(0));
  const localFoodValue = localFoodData[localFoodPurchasesIndex.row];

  const renderOption = (title, index): React.ReactElement => (
    <SelectItem key={index} title={title} />
  );

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
    try{
      
      
      // Update WizardStore state locally
      WizardStore.update((s) => {
        s.progress = 40;
        s.redMeatConsumption = data.redMeatConsumption;
        s.localFoodPurchases = localFoodPurchasesIndex.row;
        s.poultryConsumption = data.poultryConsumption;
        s.dairyConsumption = data.dairyConsumption;
        s.seafoodConsumption = data.seafoodConsumption;
      });
  
      // console.log("Fast Fashion Index:", localFoodPurchasesIndex.row);

      // Navigate to the 'Shopping' screen
      navigation.navigate('Shopping');
      } catch (error) {
      console.error('Error updating WizardStore state or navigating to the Shopping screen:', error);
      // Handle error 
    }};



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

  console.log(errors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Food' alignment='center' accessoryLeft={BackAction}/>
      <Layout style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <ProgressBar
              style={styles.progressBar}
              progress={WizardStore.getRawState().progress}
            />
            <Layout style={{ paddingHorizontal: 16 }}>
              {/* input for number of times red meat consumed per week (redMeatConsumption) */}
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="How many servings of red meat do you have per week?"
                      placeholder="#"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                  name="redMeatConsumption"
                />
                {renderError('redMeatConsumption')}
              </View>

              {/* dropdown for type of vehicle fuel (localFoodPurchases) */}
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label="How often do you buy produce from local sources?"
                      placeholder='Active'
                      value={localFoodValue}
                      selectedIndex={localFoodPurchasesIndex}
                      onSelect={(index: IndexPath) => setlocalFoodPurchasesIndex(index)}
                    >
                      {localFoodData.map((option, index) => renderOption(option, index))}

                    </Select>
                  )}
                  name="localFoodPurchases"
                />
              </View>

              {/* input for number of meals with poultry (poultryConsumption) */}
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="How many servings of chicken do you have per week:"
                      placeholder="Enter #"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                  name="poultryConsumption"
                />
                {renderError('poultryConsumption')}
              </View>

              {/* input for number of milk cartons bought per week (dairyConsumption) */}
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="How many litres of milk do you consume per month? "
                      placeholder="Enter #"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                  name="dairyConsumption"
                />
                {renderError('dairyConsumption')}
              </View>

              {/* input for number of seafood meals */}
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
                      keyboardType="numeric"
                    />
                  )}
                  name="seafoodConsumption"
                />
                {renderError('seafoodConsumption')}
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
});
