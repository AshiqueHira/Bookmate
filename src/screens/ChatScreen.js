import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import ChatItem from '../components/ChatItem'
import { AppContext } from '../contexts/AppProvider'
import { useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {

   
    const { user } = useContext(AppContext)
  const isFocussed =useIsFocused()

  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  const getChats = async () => {
    const tmpData = []
    await firestore()
      .collection('Chats')
      .where('users', 'array-contains', user.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          tmpData.push({ id: doc.id, ...doc.data() })
        })
      });
      setProfiles(tmpData)
    setLoading(false)
  }

  useEffect(() => {
    getChats()
  }, [isFocussed])

    return (
        <FlatList
            ListHeaderComponent={<Header label='Chats' from='chats' />}
            data={profiles}
            renderItem={({ item }) => <ChatItem item={item} />}
            style={styles.container}
        />
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG
    }
})