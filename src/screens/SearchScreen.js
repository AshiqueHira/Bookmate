import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BookItem from '../components/BookItem'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import { TextInput } from 'react-native-gesture-handler'

const SearchScreen = () => {

    const [books, setBooks] = useState([])

    return (
        <View style={styles.container}>
            <Header label='Search' from='search' />
            <TextInput style={styles.search} placeholder='Search your book' placeholderTextColor={'#979797'} />
            <FlatList
                data={books}
                renderItem={({ item }) => <BookItem book={item} />}

            />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG,
        flex: 1
    },
    search: {
        paddingLeft: 20,
        margin: 8,
        marginBottom: 22,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#979797'
    }
})