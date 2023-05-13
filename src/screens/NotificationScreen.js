import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Header from '../components/Header'
import { BG, BLACK } from '../utils/Colors'
import NotificationItem from '../components/NotificationItem'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'
import { useIsFocused } from '@react-navigation/native'
import { WIDTH } from '../utils/constants'
import BookItem from '../components/BookItem'
const NotificationScreen = () => {

  const { user } = useContext(AppContext)
  const isFocussed = useIsFocused()

  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBooks, setShowBooks] = useState(false)
  const [books, setBooks] = useState([])

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

  const getAllBooks = async () => {
    let tmpBooks = []
    await firestore()
      .collection('Books')
      .where('uploadedBy.id', '==', user.id)
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(doc => {
          tmpBooks.push({ id: doc.id, ...doc.data() })
        });
      });
    console.log(tmpBooks)
    setBooks(tmpBooks)
  }

  const onSelectBook = async (book) => {
    await firestore()
      .collection('Notifications')
      .doc(showBooks)
      .update({
        swapBy: book
      })
      .then(() => {
        setShowBooks(false)
        getNotifications()
      })
  }

  useEffect(() => {
    getNotifications()
    getAllBooks()
  }, [isFocussed])

  return (
    <>
      <FlatList
        ListHeaderComponent={<Header label='Bookmate' from='notifications' />}
        data={notifs}
        renderItem={({ item }) => <NotificationItem setShowBooks={setShowBooks} item={item} getNotifications={getNotifications} />}
        style={styles.container}
      />
      {/* Select book Modal */}
      {/* {showBooks && <Modal
        animationType="slide"
        transparent={true}
        visible={showBooks != false}
        onRequestClose={() => {
          setShowBooks(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text style={styles.modalTitle}>Select Book</Text>
              <TouchableOpacity onPress={() => setShowBooks(false)} >
                <Text style={styles.modalTitle}>x</Text>
              </TouchableOpacity>
            </View>
            {books.map(book => <BookItem book={book} onLongPress={() => { }} />)}

          </View>
        </View>
      </Modal>} */}

      <Modal isVisible={showBooks != false}
        deviceWidth={WIDTH}
        style={{ margin: 0, }}
      >
        <ScrollView style={styles.modalView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={styles.modalTitle}>Select Book</Text>
            <TouchableOpacity onPress={() => setShowBooks(false)} >
              <Text style={styles.modalTitle}>x</Text>
            </TouchableOpacity>
          </View>
          {books.map(book => <BookItem book={book} from='select' onPress={() => onSelectBook(book)} onLongPress={() => { }} />)}

        </ScrollView>

      </Modal >
    </>


  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,

  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    width: WIDTH,
    padding: 10
  },
  modalTitle: {
    marginBottom: 15,
    color: BLACK,
    fontSize: 18,
    fontWeight: "700"
  },

})