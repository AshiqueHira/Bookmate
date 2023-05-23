import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import { BG, SEC_BG, SEC_TEXT } from '../utils/Colors'
import { ADD_PIC } from '../utils/icons'
import { WIDTH } from '../utils/constants'
import TextInputComp from '../components/TextInputComp'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import Btn from '../components/Btn'
import { AppContext } from '../contexts/AppProvider'

const AddBookScreen = ({ navigation, route }) => {

    const { user } = useContext(AppContext)
    const { book } = route.params


    const { email } = auth().currentUser

    const [img, setImg] = useState('')
    const [name, setName] = useState(book?.name ?? '')
    const [author, setAuthor] = useState(book?.author ?? '')
    const [cat, setCat] = useState(book?.cat ?? '')
    const [city, setCity] = useState(book?.city ?? '')
    const [town, setTown] = useState(book?.town ?? '')
    const [dsc, setDsc] = useState(book?.dsc ?? '')
    const [loading, setLoading] = useState(false)

    const picSelecter = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
        })
        if (result) {
            setImg(result.assets[0].uri)

        }
    }

    const uploadImg = async () => {
        const path = email + '/' + 'name' + new Date().toString()
        console.log(path)
        const reference = storage().ref(path);
        await reference.putFile(img);
        const url = await storage().ref(path).getDownloadURL();

        return url
    }

    const saveToDb = async () => {

        if ([img, name, author, cat, city, town, dsc].includes('')) return Alert.alert('Fill all fields.')

        setLoading(true)
        const imgUrl = await uploadImg()
        await firestore()
            .collection('Books')
            .add({
                uploadedBy: user,
                name,
                author,
                cat,
                city,
                town,
                dsc,
                img: imgUrl,
                recomendations: [],
                timeStamp: new Date()
            })
            .then(() => {
                console.log('Book added!');
                navigation.goBack()
            }).catch(() => {
                Alert.alert('Error, Try again.')
            })

        setLoading(false)
    }

    const updateToDb = async () => {

        if ([name, author, cat, city, town, dsc].includes('')) return Alert.alert('Fill all fields.')

        setLoading(true)
        let imgUrl
        if (img) {
            imgUrl = await uploadImg()
        }
        await firestore()
            .collection('Books')
            .doc(book.id)
            .update({
                name,
                author,
                cat,
                city,
                town,
                dsc,
                img: imgUrl ?? book.img,
            })
            .then(() => {
                console.log('Book Updated!');
                navigation.goBack()
            }).catch(() => {
                Alert.alert('Error, Try again.')
            })

        setLoading(false)
    }

    return (
        <ScrollView style={styles.container}  >
            <Header label={book ? 'Update' : 'Upload Book'} from='addBook' />
            {img ?
                <TouchableOpacity onPress={picSelecter} style={styles.addWrpr} >
                    <Image source={{ uri: img }} style={styles.addWrpr} />
                </TouchableOpacity>
                :
                book
                    ? <TouchableOpacity onPress={picSelecter} style={styles.addWrpr} >
                        <Image source={{ uri: book.img }} style={styles.addWrpr} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={picSelecter} style={styles.addWrpr} >
                        <Image source={ADD_PIC} style={styles.ico} />
                        <Text style={{ color: 'gray' }} >Upload photo of your book</Text>
                    </TouchableOpacity>}
            <View style={styles.wrpr} >
                <Text style={styles.label} >Name of the Book</Text>
                <TextInputComp value={name} onChangeText={(e) => setName(e)} />

                <Text style={styles.label} >Author</Text>
                <TextInputComp value={author} onChangeText={(e) => setAuthor(e)} />

                <Text style={styles.label} >Category</Text>
                <TextInputComp value={cat} onChangeText={(e) => setCat(e)} />

                <Text style={styles.label} >City</Text>
                <TextInputComp value={city} onChangeText={(e) => setCity(e)} />

                <Text style={styles.label} >Town</Text>
                <TextInputComp value={town} onChangeText={(e) => setTown(e)} />

                <Text style={styles.label} >Description</Text>
                <TextInputComp value={dsc} onChangeText={(e) => setDsc(e)} />
                <Btn title={loading ? 'Loading...' : book ? 'Update' : 'Upload'} onPress={() => book ? updateToDb() : saveToDb()} disabled={loading} containerStyle={{ marginTop: 10 }} />
            </View>
        </ScrollView>
    )
}

export default AddBookScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG,
        flex: 1,
        marginBottom: 15
    },
    addWrpr: {
        height: WIDTH,
        width: WIDTH,
        backgroundColor: SEC_BG,
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'cover'
    },
    ico: {
        height: 60,
        width: 60,
    },
    wrpr: {
        padding: 15
    },
    label: {
        marginTop: 7,
        color: SEC_TEXT,
        marginBottom: 3,
        fontSize: 12
    }
})