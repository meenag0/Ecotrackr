import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";


const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

export const EnergyScreen = ({navigation}) => {

    const navigateBack = () => {
        navigation.goBack();
      };
    
      const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
      );


    const isFocused = useIsFocused();

    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  
    useEffect(() => {
      isFocused &&
        WizardStore.update((s) => {
          s.progress = 20;
        });
  
      console.log("updated state...", WizardStore.getRawState().progress);
    }, [isFocused]);
  
    const onSubmit = (data) => {
      WizardStore.update((s) => {
        s.progress = 40;
        s.birthPlace = data.birthPlace;
        s.maidenName = data.maidenName;
      });
      navigation.navigate("Step3");
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };

       

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TopNavigation title='Transportation' alignment='center' accessoryLeft={BackAction}/>
    <Layout style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
      />

    <Layout style={{ paddingHorizontal: 16 }}>

      <View style={styles.formEntry}>
      <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "miles travelled",
            placeholder: "Enter miles travelled this week.",
            name: "milesTravelled",
          }}
        />
      <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "Birth Place",
            placeholder: "City and State Where You Were Born",
            name: "birthPlace",
          }}
        />
        <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "Maiden Name",
            placeholder: "Enter You Mother's Maiden Name",
            name: "maidenName",
          }}
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
});

function RHFTextInput({ control, errors, inputProps }) {
    return (
      <View style={styles.formEntry}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              appearance="outlined"
              label={inputProps.label}
              placeholder={inputProps.placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={inputProps.name}
        />
        {errors[`${inputProps.name}`] && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>
    );
  }