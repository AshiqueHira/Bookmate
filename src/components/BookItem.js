import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { CHAT_ICO, Location_ICO, Recomendation_ICO, Review_ICO } from '../utils/icons'
import { BLACK, SEC_TEXT } from '../utils/Colors'
import { WIDTH } from '../utils/constants'
import { useNavigation } from '@react-navigation/native'
import { ddmmyyy } from '../helpers/ddmmyyyy'

const BookItem = ({ book }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails',{book})} style={styles.container} >
            <Image source={{ uri: book.img }} style={styles.img} />
            <View style={styles.txtWrpr} >
                <Text style={styles.date}>{book?.cat}  {ddmmyyy(book?.timeStamp?.toDate())}</Text>
                <Text style={styles.title}>{book.name}</Text>
                <View style={styles.subWrpr}>
                    <Image style={styles.ico} source={Location_ICO} />
                    <Text style={styles.txt}>{book.city}</Text>
                </View>
                <View style={styles.subWrpr}>
                    <Image style={styles.ico} source={Recomendation_ICO} />
                    <Text style={styles.txt}>120 Recommendations</Text>
                </View>
                <View style={styles.subWrpr}>
                    <Image style={styles.ico} source={Review_ICO} />
                    <Text style={styles.txt}>10 Reviews</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default BookItem

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        marginLeft: 10,
        flexDirection: 'row',
        height: 140,
    },
    img: {
        width: 120,
        height: 140,
        objectFit: 'cover'
    },
    txtWrpr: {
        padding: 8,
        width: WIDTH - 165

    },
    date: {
        color: SEC_TEXT
    },
    title: {
        color: BLACK,
        fontSize: 14,
        marginBottom: 6,
        fontWeight: 500

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
    }

})