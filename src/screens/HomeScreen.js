import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BookItem from '../components/BookItem'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'
import { useIsFocused } from '@react-navigation/native'


const HomeScreen = () => {

    const [books, setBooks] = useState([])
    const { getUser } = useContext(AppContext)
    const isFocussed = useIsFocused()

    const getAllBooks = async () => {
        let tmpBooks = []
        await firestore()
            .collection('Books')
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {
                    tmpBooks.push({ id: doc.id, ...doc.data() })
                });
            });

        setBooks(tmpBooks)
    }
    useEffect(() => {
        getAllBooks()
        getUser()
    }, [isFocussed])
    return (
        <FlatList
            ListHeaderComponent={<Header label='Bookmate' from='home' />}
            data={books}
            renderItem={({ item }) => <BookItem book={item} onLongPress={() => { }} />}
            style={styles.container}
        />
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG
    }
})