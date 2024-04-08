import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { apiKey } from '../config';
import axios from 'axios';

const MapScreen = () => {
  const [heatmapImageUrl, setHeatmapImageUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    const fetchHeatmapData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
    
        // Get the user's current location
        let location = await Location.getCurrentPositionAsync({});
    
        // Log location data before sending it to the server
        console.log("Location data:", location.coords.latitude, location.coords.longitude);
    
        // Send location data to server and fetch heatmap data
        const response = await axios.post('http://localhost:8080/fetch_heatmap', {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setHeatmapImageUrl(URL.createObjectURL(new Blob([response.data])));
          
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };
  
    fetchHeatmapData();
  }, []);

  console.log("Heatmap tile URL:", heatmapImageUrl);

  return (
    <View style={styles.container}>
      {heatmapImageUrl ? (
        <Image source={{ uri: heatmapImageUrl }} style={styles.map} />
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
