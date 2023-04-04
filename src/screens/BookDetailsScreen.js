import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { BG, BLACK, SEC_TEXT } from '../utils/Colors'
import { WIDTH } from '../utils/constants'
import { Recomendation_ICO, REQUEST_ICO, STAR_ICO } from '../utils/icons'

const BookDetailsScreen = () => {
    const img = 'https://cdn.pixabay.com/photo/2018/05/10/08/59/book-3387071_960_720.jpg'
    return (
        <View style={styles.container} >
            <Header label='Bookmate' from='bookDetails' />

            <ScrollView>
                <View style={styles.profWrpr} >
                    <Image source={{ uri: img }} style={styles.profIco} />
                    <Text style={styles.profName} >Arun K</Text>
                    <Image source={STAR_ICO} style={styles.star} />
                    <Text style={styles.profName}>210</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.date}>Posted on 18.10.2022</Text>
                </View>
                <Image source={{ uri: img }} style={styles.img} />
                <View style={styles.wrpr} >
                    <Text style={styles.title} >A Bright Ray of Darkness - Ethan Hawke</Text>
                    <Text style={styles.cat} >Category: Novel  </Text>
                    <Text style={styles.loc}>Location: Vadakara, Kozhikode</Text>

                    <View style={styles.subWrpr}>
                        <View>
                            <Image style={styles.ico} source={Recomendation_ICO} />
                            <Text style={styles.icoTxt}>226 Recommendations</Text>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <Image style={{ width: 30, height: 30 }} source={REQUEST_ICO} />
                            <Text style={styles.icoTxt}>Request</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wrpr2}>
                    <Text style={styles.dsc}>Description</Text>
                    <Text style={{ color: BLACK }} >A bracing meditation on fame and celebrity, and the redemptive, healing power of art; a portrait of the ravages of disappointment and divorce; a poignant consideration</Text>
                </View>
            </ScrollView>

        </View>
    )
}

export default BookDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG,

    },
    profWrpr: {
        marginTop: 18,
        marginBottom: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profIco: {
        height: 20,
        width: 20,
        borderRadius: 100,

    },
    profName: {
        color: BLACK,
        fontWeight: 500,
        marginLeft: 8
    },
    star: {
        marginLeft: 5,
        height: 20,
        width: 20,
        objectFit: 'contain'
    },
    date: {
        fontSize: 12,
        fontWeight: 400,
        color: SEC_TEXT
    },
    img: {
        width: WIDTH,
        height: WIDTH
    },
    wrpr: {
        padding: 12,
        width: WIDTH,
    },
    title: {
        fontSize: 20,
        fontWeight: 400,
        color: BLACK
    },
    cat: {
        marginVertical: 8,
        color: SEC_TEXT
    },
    loc: {
        fontSize: 12,
        color: BLACK
    },
    subWrpr: {
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ico: {
        height: 35,
        width: 35,
        marginLeft: 10
    },
    icoTxt: {
        color: BLACK,
        fontSize: 12
    },
    wrpr2: {
        padding: 12,
        width: WIDTH,
    },
    dsc: {
        paddingBottom: 10,
        color: BLACK,
        fontSize: 13,
        borderBottomWidth: 1
    }
})