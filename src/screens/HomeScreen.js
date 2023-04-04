import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import firestore from '@react-native-firebase/firestore';


const HomeScreen = () => {

    const [books, setBooks] = useState([])

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
    }, [])
    return (
        <FlatList
            ListHeaderComponent={<Header label='Bookmate' from='home' />}
            data={books}
            renderItem={({ item }) => <BookItem book={item} />}
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