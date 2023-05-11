import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider'
import { getTimeAgo } from '../helpers/getTimeAgo'
import { BLACK, SEC_BG } from '../utils/Colors'

const MessageItem = ({ chat }) => {

    const { user } = useContext(AppContext)
    const { content, type, time, ids } = chat

    const from = user.id

    if (type == 'req_accepted') return (
        <View style={{ ...styles.acceptContainer, }} >
            <Text style={styles.req_text}>{'Request Accepted'}</Text>
            {/* <Text style={styles.date}>{getTimeAgo(chat?.time?.toDate())}</Text> */}
        </View>
    )

    return (
        <View style={{ ...styles.container, alignSelf: ids[0] == from ? 'flex-end' : 'flex-start', backgroundColor: ids[0] == from ? '#FEDC5A' : '#E7E7E7' }} >
            {type == 'text' ? <Text style={styles.text}>{chat.content}</Text> : null
            }

            <Text style={styles.date}>{getTimeAgo(chat?.time?.toDate())}</Text>
        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    acceptContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    req_text: {
        padding: 10,
        borderRadius: 5,
        borderColor: BLACK,
        borderWidth: 1,
        backgroundColor: SEC_BG,
        color: BLACK,
        fontSize:12
    },
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,

    },
    text: {
        color: BLACK,
        fontSize: 15
    },
    image: {
        width: 150,
        height: 150,
        // resizeMode: 'contain'
    },
    date: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontSize: 11,
        color: 'gray'
    },

})