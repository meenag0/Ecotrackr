import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { apiKey } from '../config';

const MapScreen = () => {
  const [heatmapTileUrl, setHeatmapTileUrl] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      const radius = 15; // 15 mile radius
      const zoomLevel = 10;
      const north = latitude + (radius / 69);
      const south = latitude - (radius / 69);
      const east = longitude + (radius / (Math.cos(latitude * Math.PI / 180) * 69));
      const west = longitude - (radius / (Math.cos(latitude * Math.PI / 180) * 69));

      const apiUrl = `https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/${zoomLevel}/${north}/${west}:${south}/${east}?includePlaces=true&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.blob();
          setHeatmapTileUrl(URL.createObjectURL(data));
        } else {
          console.error('Error fetching heatmap data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && heatmapTileUrl ? (
        <Image source={{ uri: heatmapTileUrl }} style={styles.map} />
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
  },
});

export default MapScreen;
