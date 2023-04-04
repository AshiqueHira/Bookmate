import { Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { HOME_ICO, NOTIFICATION_ICO, PROFILE_ICO, SEARCH_ICO } from '../utils/icons';
import { BLACK, SEC_BG, SEC_TEXT } from '../utils/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomNav" component={MyTabs} />
    </Stack.Navigator>
  )
}


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = HOME_ICO
          } else if (route.name === 'Search') {
            iconName = SEARCH_ICO
          } else if (route.name === 'Notification') {
            iconName = NOTIFICATION_ICO
          } else if (route.name === 'Profile') {
            iconName = PROFILE_ICO
          }



          // You can return any component that you like here!
          return <Image source={iconName} style={{ height: 20, width: 20, tintColor: color, resizeMode: 'contain' }} />;
        },
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: SEC_TEXT,
      })}

    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default AppNav