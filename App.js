import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNav from './src/nav/AppNav'
import AuthNav from './src/nav/AuthNav';

const App = () => {
  return (
    <NavigationContainer>
      <AppNav />
      {/* <AuthNav/> */}
    </NavigationContainer>
  )
}

export default App