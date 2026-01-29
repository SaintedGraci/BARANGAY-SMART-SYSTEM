import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (token) {
        // User is logged in, go to main app
        router.replace('/(tabs)');
      } else {
        // User is not logged in, go to login
        router.replace('/login');
      }
    } catch (error) {
      // If there's an error, go to login
      router.replace('/login');
    }
  };

  // Show loading screen while checking auth
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2563EB' }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}