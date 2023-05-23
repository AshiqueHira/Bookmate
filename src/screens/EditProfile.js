import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppProvider'
import TextInputComp from '../components/TextInputComp'
import { useNavigation } from '@react-navigation/native'
import Btn from '../components/Btn'
import Header from '../components/Header'
import { BG } from '../utils/Colors'
import firestore from '@react-native-firebase/firestore';
const EditProfile = ({ navigation }) => {

    const { user, getUser } = useContext(AppContext)


    const [email, setEmail] = useState(user.email)
    const [userName, setUserName] = useState(user.userName)
    const [phNo, setPhNo] = useState(user.phNo)
    const [name, setName] = useState(user.name)
    const [desc, setDesc] = useState(user.desc)
    const [confPwd, setConfPwd] = useState()


    const saveToDb = async () => {
        await firestore()
            .collection('Users')
            .doc(user.id)
            .update({
                email,
                userName,
                phNo,
                name,
                desc

            })
            .then(async () => {
                console.log('User Edited!');
                await getUser()
                Alert.alert('Profile Updated')
                navigation.goBack()
            });
    }
    return (
        <View style={styles.container} >
            <Header label='Settings' from='settings' />

            <View style={styles.sub} >
                <TextInputComp placeHolder={'Name'} value={name} onChangeText={(e) => setName(e)} />
                <TextInputComp placeHolder={'User Name'} style={{ marginTop: 8 }} value={userName} onChangeText={(e) => setUserName(e)} />
                <TextInputComp placeHolder={'Phone Number'} style={{ marginTop: 8 }} value={phNo} onChangeText={(e) => setPhNo(e)} />
                <TextInputComp placeHolder={'Email Id'} style={{ marginTop: 8 }} value={email} onChangeText={(e) => setEmail(e)} />
                <TextInputComp
                    placeHolder={'Description'}
                    style={{ marginTop: 8, textAlignVertical: 'top' }}
                    value={desc}
                    onChangeText={(e) => setDesc(e)}
                    multiline={true}
                    numberOfLines={4}
                />
                <Btn onPress={saveToDb} title='Save' containerStyle={{ marginTop: 25, }} />

            </View>



        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG
    },
    sub: {
        padding: 10
    },
    title: {
        marginBottom: 60,
        color: '#000000',
        fontSize: 30,
        fontWeight: '700'
    },

    signup: {
        marginTop: 90,
        color: '#000000',
        fontWeight: '500'
    }
})