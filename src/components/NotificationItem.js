import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { getTimeAgo } from '../helpers/getTimeAgo'
import { BLACK } from '../utils/Colors'
import { Location_ICO } from '../utils/icons'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'
import { useNavigation } from '@react-navigation/native'


const NotificationItem = ({ item, setShowBooks }) => {


  const { user } = useContext(AppContext)

  const navigation = useNavigation()

  const [status, setStatus] = useState(item?.status)


  const onAccept = async () => {

    if (item.type == 'swap' && !item.swapBy) return Alert.alert('Select a book to continue with chat')

    await firestore().collection('Notifications')
      .doc(item.id)
      .update({
        status: 'chat_initiated',
      })

    await startChat()
    setStatus('chat_initiated')
  }

  const startChat = async () => {

    await firestore()
      .collection('Chats')
      .add({
        users: [user.id, item?.from],
        type: 'request',
        toUser: item?.book?.uploadedBy,
        notificationId: item.id,
        timeStamp: new Date()
      })
      .then(async (doc) => {
        console.log('Book added!');
        await firestore()
          .collection('Chats')
          .doc(doc.id)
          .collection('Messages')
          .add({
            ids: [user.id, item?.from],
            content: '',
            type: 'req_accepted',
            time: new Date()
          })
          .then(() => {

            navigation.navigate('Messages', {
              item: {
                users: [user.id, item?.from],
                type: 'request',
                toUser: item?.book?.uploadedBy,
                timeStamp: new Date()
              }
            })
          })

          .catch((error) => {
            console.log(error)

          })
      }).catch(() => {
        Alert.alert('Error, Try again.')
      })
  }

  const onDecline = async () => {
    await firestore().collection('Notifications')
      .doc(item.id)
      .update({
        status: 'declined'
      })
    setStatus('declined')
  }



  return (
    <TouchableOpacity style={styles.container}  >
      <View style={styles.sub1}>
        <Text style={styles.grant}>Grant Request</Text>
        <Text style={styles.time}>{getTimeAgo(item?.timeStamp?.toDate())}</Text>
      </View>
      <Text style={styles.title}>{item?.book?.name}</Text>
      <View>
        <Text style={styles.author}>{item?.book?.author}</Text>
      </View>
      <View style={styles.subWrpr}>
        <Image style={styles.ico} source={Location_ICO} />
        <Text style={styles.txt}>{item?.book?.city}</Text>
      </View>
      {status == 'send' && <View style={styles.btnWrpr}>
        <TouchableOpacity onPress={onAccept} style={styles.accBtn}>
          <Text style={styles.accept}>Let's Chat</Text>
        </TouchableOpacity>
        {item.type == 'swap' && <TouchableOpacity disabled={item.swapBy ? true : false} onPress={() => setShowBooks(item.id)} style={[styles.accBtn, { backgroundColor: 'green' }]}>
          <Text style={styles.accept}>{item.swapBy ? 'Book Selected' : 'Select a book'}</Text>
        </TouchableOpacity>}
        <TouchableOpacity onPress={onDecline} style={styles.decBtn}>
          <Text style={styles.decline}>Decline</Text>
        </TouchableOpacity>
      </View>}
      {
        status == 'chat_initiated' && <Text style={styles.accepted}>Chat Initiated</Text>
      }

      {
        status == 'declined' && <Text style={styles.declined}>Declined</Text>
      }
    </TouchableOpacity>
  )
}

export default NotificationItem

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#DDF3C2',
    borderRadius: 10,

  },
  sub1: {
    flexDirection: 'row'
  },
  grant: {
    color: BLACK,
    fontWeight: "700",
    marginRight: 15
  },
  time: {
    color: BLACK,
    fontWeight: "300"
  },

  title: {
    marginTop: 10,
    color: BLACK,
    fontSize: 25,

  },
  author: {
    marginVertical: 15,
    color: BLACK
  },

  subWrpr: {
    flexDirection: 'row',
    marginBottom: 4
  },
  ico: {
    height: 15,
    width: 15,
    objectFit: 'contain'
  },
  txt: {
    marginLeft: 7,
    color: BLACK,
    fontSize: 12,
    fontWeight: 300
  },
  btnWrpr: {
    marginTop: 15,
    flexDirection: 'row'
  },
  accBtn: {
    marginRight: 10,
    padding: 7,
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  accept: {
    color: 'white',
  },
  decBtn: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center'
  },
  decline: {
    color: 'white'
  },
  accepted: {
    color: 'green',
    marginTop: 15,
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-end'
  },
  letChat: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  declined: {
    color: 'red',
    marginTop: 15,
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-end'
  }
})