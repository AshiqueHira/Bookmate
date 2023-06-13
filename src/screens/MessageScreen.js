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
    console.log(item, 'ituuuu')

    const { user } = useContext(AppContext)
    const [chats, setChats] = useState([])
    const [notification, setNotfifcation] = useState({ users: [] })





    const ProfilePic = () => (
        <Image source={PROFILE_ICO} style={styles.profImg} />
    )
    const Header = () => (
        <View style={styles.header} >
            <Image source={PROFILE_ICO} style={styles.img} />
            <View style={styles.txtWrpr}>
                <Text style={styles.name}> {item.users[1] == user.id ? item?.toUser?.name : item?.otherUser?.name}</Text>
            </View>
            <View style={{ flex: 1 }} />
            {notification && <MenuBtn />}
        </View>
    )


    const MenuBtn = () => {

        const actions = []
        if (notification.type == 'grant') {
            if (notification?.users[0] == user.id) {
                actions.push({
                    id: 'send',
                    titleColor: 'white',
                    title: 'Book Send',
                })
            }

            if (notification?.users[0] != user.id) {
                actions.push({
                    id: 'recieved',
                    title: 'Book Recieved',
                    titleColor: 'white',
                })
            }
        }
        if (notification.type == 'swap') {
            actions.push({
                id: 'send',
                titleColor: 'white',
                title: 'Book Send',
            })
            actions.push({
                id: 'recieved',
                title: 'Book Recieved',
                titleColor: 'white',
            })
        }


        return (
            <MenuView
                title="Menu Title"
                onPressAction={({ nativeEvent }) => {
                    console.warn(JSON.stringify(nativeEvent));
                    onMenuItemClick(nativeEvent.event)
                }}

                actions={actions}
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

    const updateSwap = async (id, type) => {
        await firestore()
            .collection('Users')
            .doc(id)
            .update({
                [type]: firestore.FieldValue.increment(1)
            })
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

                    if (event == 'recieved') {
                        await updateSwap(notification.users[0], 'grant')
                    }

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

        if (notification?.type == 'swap') {
            await firestore().collection('Notifications')
                .doc(item.notificationId)
                .update({
                    ...(event == 'send' && user.id == notification.users[1] && { 'swapInitor.send': true }),
                    ...(event == 'send' && user.id == notification.users[0] && { 'bookOwner.send': true }),
                    ...(event == 'recieved' && user.id == notification.users[1] && { 'swapInitor.recieved': true }),
                    ...(event == 'recieved' && user.id == notification.users[0] && { 'bookOwner.recieved': true }),
                })
                .then(async (doc) => {

                    if (event == 'recieved') {
                        await updateSwap(user.id, 'swap')
                    }

                    await firestore()
                        .collection('Chats')
                        .doc(item.id)
                        .collection('Messages')
                        .add({
                            ids: item.users,
                            content: '',
                            ...(event == 'send' && { type: 'send' }),
                            ...(event == 'recieved' && { type: 'recieved' }),
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
                extraData={chats.sort((a, b) => b?.time?.toDate() - a?.time?.toDate())}
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