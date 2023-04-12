import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { getTimeAgo } from '../helpers/getTimeAgo'
import { BLACK } from '../utils/Colors'
import { Location_ICO } from '../utils/icons'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'


const NotificationItem = ({ item }) => {

  const { user } = useContext(AppContext)


  const [status, setStatus] = useState(item?.status)

  const onAccept = async () => {

    await firestore().collection('Notifications')
      .doc(item.id)
      .update({
        status: 'accepted',
      })

    await startChat()
    setStatus('accepted')
  }

  const startChat = async () => {

    await firestore()
      .collection('Chats')
      .add({
        users: [user.id, item?.book?.uploadedBy.id],
        type: 'request',
        toUser: item?.book?.uploadedBy,
        timeStamp: new Date()
      })
      .then(() => {
        console.log('Book added!');
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
    <View style={styles.container} >
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
          <Text style={styles.accept}>Accept Request</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDecline} style={styles.decBtn}>
          <Text style={styles.decline}>Decline</Text>
        </TouchableOpacity>
      </View>}
      {
        status == 'accepted' && <Text style={styles.accepted}>Accepted</Text>
      }
      {
        status == 'declined' && <Text style={styles.declined}>Declined</Text>
      }
    </View>
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
    borderRadius: 10
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
  declined: {
    color: 'red',
    marginTop: 15,
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-end'
  }
})