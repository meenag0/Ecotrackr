import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { apiKey } from '../config';
import axios from 'axios';

const MapScreen = () => {
  const [heatmapTileUrl, setHeatmapTileUrl] = useState('');

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/fetch_heatmap');
        setHeatmapTileUrl(response.data); // Assuming the response data is the URL of the heatmap tile
        
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
  }, []);
  console.log("Heatmap tile URL:", heatmapTileUrl);


  return (
    
    <View style={styles.container}>
      {heatmapTileUrl ? (
        <Image source={{ uri: heatmapTileUrl }} style={styles.map} 
        />
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
    borderRadius: 10, // Add border radius for rounded corners
    borderWidth: 2, // Add border width
    borderColor: '#ccc', // Add border color
  },
});

export default MapScreen;
