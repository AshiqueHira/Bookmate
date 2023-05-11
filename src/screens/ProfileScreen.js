import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';
import { GIFT_ICO, PROFILE_ICO, STAR_ICO, WALLET_ICO } from '../utils/icons';
import Header from '../components/Header';
import { AppContext } from '../contexts/AppProvider';
import { BG, BLACK } from '../utils/Colors';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BookItem from '../components/BookItem';
const ProfileScreen = () => {

    const { user } = useContext(AppContext)
    const [books, setBooks] = useState([])
    const isFocussed = useIsFocused()

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

        setBooks(tmpBooks)
    }

    const onDelete = (id) => {
        Alert.alert('Delete', 'Do you want to delete this book?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => deleteBook(id) },
        ]);
    }

    const deleteBook = (id) => {
        firestore()
            .collection('Books')
            .doc(id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                getAllBooks()
            });
    }

    useEffect(() => {
        getAllBooks()
    }, [isFocussed])
    return (
        <ScrollView style={styles.container} >
            <Header label={user.name} from='profile' />
            {/* <Btn onPress={() => auth().signOut()}title='Signout' /> */}

            <View style={styles.sub} >
                <Image style={styles.profImg} source={PROFILE_ICO} />
                <View style={styles.wrpr} >
                    <View style={styles.wrpr1} >
                        <Image style={styles.img} source={WALLET_ICO} />
                        <Text style={styles.text} >10{'\n'}Swaps </Text>
                    </View>
                    <View style={styles.wrpr1} >
                        <Image style={styles.img} source={GIFT_ICO} />
                        <Text style={styles.text} >10{'\n'}Donations </Text>
                    </View>
                    <View style={styles.wrpr1} >
                        <Image style={styles.img} source={STAR_ICO} />
                        <Text style={styles.text} >10{'\n'}Trust Points </Text>
                    </View>
                </View>
            </View>
            <View style={styles.sub1} >
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.userName}>@{user.userName}</Text>
                <Text style={styles.about}>{user.desc}</Text>
            </View>
            <View style={styles.sub1} >
                <Text style={styles.feed}>Feed</Text>
                {books.map(book => <BookItem book={book} onLongPress={onDelete} />)}
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG
    },
    sub: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profImg: {
        width: 75,
        height: 75
    },
    wrpr: {
        flexDirection: 'row',
        marginLeft: 15
    },
    wrpr1: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: BLACK
    },
    sub1: {
        margin: 15,
        marginTop: 15,
    },
    name: {
        color: BLACK,
        fontWeight: "700",
        fontSize: 15
    },
    userName: {
        color: BLACK
    },
    about: {
        color: BLACK
    },
    feed: {
        marginBottom: 10,
        color: BLACK,
        fontWeight: "700",
        fontSize: 15
    }
}) 