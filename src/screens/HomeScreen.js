import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BookItem from '../components/BookItem'
import Header from '../components/Header'
import { BG } from '../utils/Colors'

const HomeScreen = () => {

    const [books, setBooks] = useState([1, 2, 3, 4, 5, 6, 8, 6, 8,])

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