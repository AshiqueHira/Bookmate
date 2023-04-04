import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BLACK, SEC_BG } from '../utils/Colors'
import { CHAT_ICO, PLUS_ICO } from '../utils/icons'

const Header = ({ label, from }) => {

    const ChatAndPlus = () => {
        return (<View style={styles.cpWrpr}>
            <TouchableOpacity>
                <Image source={PLUS_ICO} style={styles.cpIco} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={CHAT_ICO} style={styles.cpIco} />
            </TouchableOpacity>
        </View>)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            {
                from == 'home' && <ChatAndPlus />
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderBottomColor: SEC_BG,
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        color: BLACK,
        fontSize: 20,
        fontWeight: 500
    },
    cpWrpr: {
        flexDirection: 'row'
    },
    cpIco: {
        marginHorizontal: 10,
        height: 20,
        width: 20,
        objectFit: "contain"
    }
})