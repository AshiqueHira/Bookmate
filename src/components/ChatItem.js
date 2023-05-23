import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { PROFILE_ICO } from '../utils/icons'
import { BLACK, SEC_BG } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../contexts/AppProvider'
import { getUser } from '../helpers/getUser'

const ChatItem = ({ item }) => {

    const navigation = useNavigation()
    const { user } = useContext(AppContext)

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Messages', { item })} style={styles.container}>
            <Image source={PROFILE_ICO} style={styles.img} />
            <View style={styles.txtWrpr}>
                <Text style={styles.name}> {item.users[1] == user.id ? item?.toUser?.name : item.otherUser.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: 'center'
    },
    img: {
        width: 50,
        height: 50,
        backgroundColor: SEC_BG,
        borderRadius: 100
    },
    txtWrpr: {
        marginLeft: 10
    },
    name: {
        color: BLACK,
        fontSize: 25,
        fontWeight: "700"
    }
})