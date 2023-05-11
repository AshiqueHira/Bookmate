import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem'
import Header from '../components/Header'
import { BG, BLACK } from '../utils/Colors'
import { TextInput } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
const SearchScreen = () => {

    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

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
        setFilteredBooks(tmpBooks)
    }

    const searchHandler = (searchText) => {
        let filtereditems = [...books]

    
        if (searchText) {
            filtereditems = filtereditems.filter(item => {
                const itemData = `${item?.name?.toUpperCase()}   
            ${item?.city?.toUpperCase()} ${item?.author?.toUpperCase()}`;

                const textData = searchText.toUpperCase();

                return itemData.indexOf(textData) > -1;
            }
            )

        }

        setFilteredBooks(filtereditems)

    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <View style={styles.container}>
            <Header label='Search' from='search' />
            <TextInput style={styles.search} onChangeText={(e) => searchHandler(e)} placeholder='Search your book' placeholderTextColor={'#979797'} />
            <FlatList
                data={filteredBooks}
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
        borderColor: '#979797',
        color: BLACK
    }
})