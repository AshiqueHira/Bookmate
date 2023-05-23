import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BLACK, SEC_BG } from '../utils/Colors'
import { CHAT_ICO, PLUS_ICO, PROFILE_EDIT_ICO } from '../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Btn from './Btn'
import auth from '@react-native-firebase/auth';

const Header = ({ label, from ,right}) => {

    const navigation = useNavigation()

    const onSignOUt = () => {
        Alert.alert('Signout', 'Do you want to Signout?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => auth().signOut() },
        ]);
    }

    const ChatAndPlus = () => {
        return (<View style={styles.cpWrpr}>
            <TouchableOpacity onPress={() => navigation.navigate('AddBook')} >
                <Image source={PLUS_ICO} style={styles.cpIco} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Chats')} >
                <Image source={CHAT_ICO} style={styles.cpIco} />
            </TouchableOpacity>
        </View>)
    }
    const PlusAndEdit = () => {
        return (<View style={styles.cpWrpr}>
            <TouchableOpacity onPress={() => navigation.navigate('AddBook')} >
                <Image source={PLUS_ICO} style={styles.cpIco} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} >
                <Image source={PROFILE_EDIT_ICO} style={styles.cpIco} />
            </TouchableOpacity>
        </View>)
    }



    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            <View style={{flex:1}} />
            {
                (from == 'home' || from == 'search' || from == 'bookDetails' || from == 'reviews') && <ChatAndPlus />

            }
            {
                (from == 'profile') && <PlusAndEdit />

            }
            {from == 'settings' && <Btn
                title={'Sign Out'}
                containerStyle={{ width: 80, }}
                titleStyle={{ fontSize: 10 }}
                onPress={onSignOUt}
            />}
            {right}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderBottomColor: SEC_BG,
        borderBottomWidth: 4,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
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