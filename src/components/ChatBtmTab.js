import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider';
import Btn from './Btn';
import { WIDTH } from '../utils/constants';

const ChatBtmTab = ({ item }) => {

    const { user } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState('')

    const sendHandler = async (type, imgUrl) => {
        if (type == 'text' && !content) return

        if (type == 'image' && !imgUrl) {
            return Alert('Image upload failed.')
        }



        setLoading(true)

        await firestore()
            .collection('Chats')
            .doc(item.id)
            .collection('Messages')
            .add({
                ids: item.users,
                content,
                type,
                time: new Date()
            }).catch((error) => {
                console.log(error)

            })
        setContent('')
        setLoading(false)
    }

    return (
        <View style={styles.container} >
            <View style={styles.inputWrpr} >
                <TextInput style={styles.input} value={content} onChangeText={(t) => setContent(t)} />
                {/* <TouchableOpacity onPress={imagePicker} >
                    <Image source={MediaIco} style={styles.media} />
                </TouchableOpacity> */}
            </View>

            <Btn containerStyle={styles.btn} title={loading ? '...' : 'Send'} onPress={() => sendHandler('text')} />
        </View>
    )
}

export default ChatBtmTab

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: WIDTH,

    },
    inputWrpr: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center'

    },
    input: {
        width: '90%',
        color: 'black'
    },
    btn: {
        marginLeft: 10,
        width: 'auto',
        borderWidth:1
    },
    media: {
        width: 25,
        height: 25
    }
})