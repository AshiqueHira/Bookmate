import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import NotificationItem from '../components/NotificationItem'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'
import { useIsFocused } from '@react-navigation/native'
const NotificationScreen = () => {

  const { user } = useContext(AppContext)
  const isFocussed =useIsFocused()

  const [notifs, setNotifs] = useState([1, 2, 3])
  const [loading, setLoading] = useState(true)

  const getNotifications = async () => {
    const tmpData = []
    await firestore()
      .collection('Notifications')
      .where('users', 'array-contains', user.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          tmpData.push({ id: doc.id, ...doc.data() })
        })
      });
    setNotifs(tmpData)
    setLoading(false)
  }

  useEffect(() => {
    getNotifications()
  }, [isFocussed])

  return (
      <FlatList
        ListHeaderComponent={<Header label='Bookmate' from='notifications' />}
        data={notifs}
        renderItem={({ item }) => <NotificationItem item={item} />}
        style={styles.container}
      />
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    
  }
})