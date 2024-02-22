import { useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  gasGallons: z.number(),
  typeCar: z.string(),
  numCars: z.number(),
});

type FormFields = z.infer<typeof schema>;

export default function AboutScreen({ navigation, route }) {


  const{

    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting}
  } = useForm<FormFields>({
    defaultValues:{
      gasGallons: 0,
      numCars: 0,
      typeCar: "Type of car",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    };
  }
  
  const { name } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);
  
  return (
      <View style={styles.container}>
        <Button
          title="Go back with data"
          onPress={() => {
            navigation.navigate("Home", { result: "Data from About" });
          }}
        />
      </View>
    );
    
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});