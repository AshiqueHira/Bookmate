import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Home" component={MyTabs} />
  </Stack.Navigator>
  )
}


function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    );
  }

export default AppNav