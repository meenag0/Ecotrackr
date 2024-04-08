import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [heatmapImage, setHeatmapImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("Location data:", location.coords.latitude, location.coords.longitude);

        const response = await axios.post('http://localhost:8080/fetch_heatmap', {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log("Response data:", response.data);

        const imageDataBase64 = response.data.image_data_base64;
        console.log("Base64 image data:", imageDataBase64);

        setHeatmapImage({ uri: `data:image/png;base64,${imageDataBase64}` });
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
  }, []);

  return (
    <View style={styles.container}>
      {heatmapImage ? (
        <Image source={{ uri: heatmapImage.uri }} style={styles.map} />
      ) : (
        <Text>Loading heatmap...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default MapScreen;
