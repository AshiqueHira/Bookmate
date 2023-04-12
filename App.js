import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNav from './src/nav/AppNav'
import AuthNav from './src/nav/AuthNav';
import auth from '@react-native-firebase/auth';
import AppProvider from './src/contexts/AppProvider';
const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <AppProvider>
        {user ?
          <AppNav />
          :
          <AuthNav />}
      </AppProvider >
    </NavigationContainer>
  )
}

export default App