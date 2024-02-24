import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, ProgressBar } from '@ui-kitten/components';
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
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
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
    });
    navigation.navigate('Energy');
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
            {errors.averageWeeklyMiles && (
              <Text style={styles.errorText}>
                This is a required field.
              </Text>
            )}
          </View>

          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Vehicle Fuel Efficiency"
                  placeholder="Enter efficiency (e.g., MPG)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="vehicleFuelEfficiency"
            />
            {errors.vehicleFuelEfficiency && (
              <Text style={styles.errorText}>
                This is a required field.
              </Text>
            )}
          </View>

          {/* Add more transportation-related input fields here if necessary */}

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

    // numImput{

    // },
  });