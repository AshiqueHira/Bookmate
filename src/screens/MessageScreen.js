import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider';
import { MENU_ICO, PROFILE_ICO } from '../utils/icons';
import Header from '../components/Header';
import MessageItem from '../components/MessageItem';
import { BG, BLACK, SEC_BG } from '../utils/Colors';
import ChatBtmTab from '../components/ChatBtmTab';
import { MenuView } from '@react-native-menu/menu';

const MessageScreen = ({ route }) => {

    const { item } = route.params ?? {}


    const { user } = useContext(AppContext)
    const [chats, setChats] = useState([])
    const [notification, setNotfifcation] = useState({ users: [] })
    // console.log(coach, 'phuy')





    const ProfilePic = () => (
        <Image source={PROFILE_ICO} style={styles.profImg} />
    )
    const Header = () => (
        <View style={styles.header} >
            <Image source={PROFILE_ICO} style={styles.img} />
            <View style={styles.txtWrpr}>
                <Text style={styles.name}>{item?.toUser?.name}</Text>
            </View>
            <View style={{ flex: 1 }} />
            {notification && <MenuBtn />}
        </View>
    )

    const MenuBtn = () => {
        return (
            <MenuView
                title="Menu Title"
                onPressAction={({ nativeEvent }) => {
                    console.warn(JSON.stringify(nativeEvent));
                    onMenuItemClick(nativeEvent.event)
                }}

                actions={[
                    (notification?.users[0] == user.id && {
                        id: 'send',
                        titleColor: 'white',
                        title: 'Book Send',

                    }),
                    (notification?.users[0] != user.id && [{
                        id: 'recieved',
                        title: 'Book Recieved',
                        titleColor: 'white',

                    }]),
                    // {
                    //     id: 'destructive',
                    //     title: 'Report Issue',
                    //     titleColor: 'white',
                    // },
                ]}
            // shouldOpenOnLongPress={true}
            >
                <View>
                    <Image source={MENU_ICO} style={styles.menu} />
                </View>
            </MenuView>
            // <TouchableOpacity>
            //     <Image source={MENU_ICO} style={styles.menu} />
            // </TouchableOpacity>
        )
    }

    const getNotification = async () => {
        let not
        await firestore().collection('Notifications')
            .doc(item.notificationId)
            .get()
            .then((doc) => {
                not = ({ id: doc.id, ...doc.data() })

            })
        setNotfifcation(not)

    }


    const onMenuItemClick = async (event) => {
        if (notification.type == 'grant') {
            await firestore().collection('Notifications')
                .doc(item.notificationId)
                .update({
                    ...(event == 'send' && { send: true }),
                    ...(event == 'recieved' && { recieved: true })
                })
                .then(async () => {
                    await firestore()
                        .collection('Chats')
                        .doc(item.id)
                        .collection('Messages')
                        .add({
                            ids: item.users,
                            content: '',
                            ...(event == 'send' && { type: 'send' }),
                            ...(event == 'recieved' && { type: 'received' }),
                            time: new Date()
                        })
                })
                .then((doc) => {

                    Alert.alert('Updated')


                })

        }

    }

    useEffect(() => {  // to get chats from db
        const subscriber = firestore()
            .collection('Chats')
            .doc(item.id)
            .collection('Messages')

            .onSnapshot(documentSnapshot => {
                const tempChats = []
                documentSnapshot?.forEach((doc) => {
                    tempChats.push({ ...doc.data(), id: doc.id })
                })
                tempChats.sort((a, b) => { if (a.time.toDate() > b.time.toDate()) return -1 })
                console.log(tempChats, 'ddd')
                setChats(tempChats)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    useEffect(() => {
        getNotification()
    }, [])

    return (
        <View style={styles.container} >
            <Header />
            <FlatList
                data={chats}
                renderItem={({ item }) => <MessageItem key={item?.time?.toDate()?.toString()} chat={item} />}
                extraData={chats}
                showsVerticalScrollIndicator={false}
                inverted
            />
            <ChatBtmTab item={item} />
        </View>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG
    },
    profImg: {
        marginRight: -10,
        marginLeft: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain',

    },

    header: {
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        borderBottomWidth: 5,
        borderBottomColor: SEC_BG
    },
    menu: {
        height: 30,
        width: 20
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