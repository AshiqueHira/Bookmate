import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [phNo, setPhNo] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [pwd, setPwd] = useState('')
    const [confPwd, setConfPwd] = useState('')

    const signUpHandler = async () => {

        if (pwd != confPwd) return Alert.alert("Passwords doesn't match")
        if ([email, userName, phNo, name, pwd].includes('')) return Alert.alert('Fill all fields')

        auth()
            .createUserWithEmailAndPassword(email, pwd)
            .then(async (user) => {
                if (user) {
                    await saveToDb()
                }
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert('Email already use. Login to continue.')
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Invalid email');
                }

                console.error(error);
            });
    }
    const saveToDb = async () => {
        await firestore()
            .collection('Users')
            .add({
                email,
                userName,
                phNo,
                name,
                desc,
                timestamp: new Date()
            })
            .then(() => {
                console.log('User added!');
            });
    }
    return (
        <View style={styles.container} >
            <Text style={styles.title} >Sign Up</Text>

            <TextInputComp placeHolder={'Name'} value={name} onChangeText={(e) => setName(e)} />
            <TextInputComp placeHolder={'User Name'} style={{ marginTop: 8 }} value={userName} onChangeText={(e) => setUserName(e)} />
            <TextInputComp placeHolder={'Phone Number'} style={{ marginTop: 8 }} value={phNo} onChangeText={(e) => setPhNo(e)} />
            <TextInputComp placeHolder={'Email Id'} style={{ marginTop: 8 }} value={email} onChangeText={(e) => setEmail(e)} />
            <TextInputComp
                placeHolder={'Description'} style={{ marginTop: 8, textAlignVertical: 'top' }} value={desc} onChangeText={(e) => setDesc(e)} multiline={true}
                numberOfLines={4}
            />
            <TextInputComp placeHolder={'Password'} style={{ marginTop: 8 }} value={pwd} onChangeText={(e) => setPwd(e)} />
            <TextInputComp placeHolder={'Confirm Password'} style={{ marginTop: 8 }} value={confPwd} onChangeText={(e) => setConfPwd(e)} />

            <Btn onPress={signUpHandler} title='Sign Up' containerStyle={{ marginTop: 25 }} />


            <Text style={styles.signup}>Already have an Account? Please <Text onPress={() => navigation.navigate('Login')} style={{ color: "#5454D4" }} >Login</Text> here</Text>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF2CE'
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