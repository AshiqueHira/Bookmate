import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CHAT_ICO, Location_ICO, Recomendation_ICO, Review_ICO } from '../utils/icons'
import { BLACK, SEC_TEXT } from '../utils/Colors'
import { WIDTH } from '../utils/constants'

const BookItem = ({ book }) => {

    const img = 'https://cdn.pixabay.com/photo/2018/05/10/08/59/book-3387071_960_720.jpg'

    return (
        <View style={styles.container} >
            <Image source={{ uri: img }} style={styles.img} />
            <View style={styles.txtWrpr} >
                <Text style={styles.date}>Novel  18.10.2022</Text>
                <Text style={styles.title}>A Bright Ray of Darkness - Ethan Hawke</Text>
                <View style={styles.subWrpr}>
                    <Image style={styles.ico} source={Location_ICO} />
                    <Text style={styles.txt}>Vadakara, Kozhikode</Text>
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
        </View>
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
        marginBottom:4
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