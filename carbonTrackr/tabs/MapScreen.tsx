import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [heatmapImage, setHeatmapImage] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);

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

        const currentConditionsResponse = await axios.post('http://localhost:8080/fetch_current_conditions', {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log("Response data:", currentConditionsResponse.data);
        setCurrentConditions(currentConditionsResponse.data);


      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
  }, []);

  return (
    <View style={styles.container}>
      {currentConditions && (
        <View style={styles.currentConditions}>
          <Text style={styles.heading}>Current Air Quality</Text>
          <Text style={styles.subheading}>Air Quality Indexes</Text>
          {currentConditions.indexes.map(index => (
            <View key={index.code} style={styles.index}>
              <Text>{index.displayName}: {index.aqiDisplay}</Text>
              <Text>{index.category}</Text>
            </View>
          ))}
          <Text style={styles.subheading}>Pollutants</Text>
          {currentConditions.pollutants.map(pollutant => (
            <View key={pollutant.code} style={styles.pollutant}>
              <Text style={styles.pollutantName}>{pollutant.displayName}</Text>
              <Text style={styles.pollutantConcentration}>{pollutant.concentration.value} {pollutant.concentration.units}</Text>
              <Text style={styles.pollutantEffects}>{pollutant.additionalInfo.effects}</Text>
            </View>
          ))}
        </View>
      )}

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
  currentConditions: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '90%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  index: {
    marginBottom: 10,
  },
  pollutant: {
    marginBottom: 10,
  },
  pollutantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pollutantConcentration: {
    fontSize: 14,
  },
  pollutantEffects: {
    fontSize: 14,
    fontStyle: 'italic',
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
