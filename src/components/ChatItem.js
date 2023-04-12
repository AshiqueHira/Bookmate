import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PROFILE_ICO } from '../utils/icons'
import { BLACK, SEC_BG } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const ChatItem = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Messages', { item })} style={styles.container}>
            <Image source={PROFILE_ICO} style={styles.img} />
            <View style={styles.txtWrpr}>
                <Text style={styles.name}>{item?.toUser?.name}</Text>
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