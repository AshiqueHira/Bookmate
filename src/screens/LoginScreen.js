import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')


    const loginHandler = async () => {

        if ([email, pwd].includes('')) return Alert.alert('Fill all fields')

        auth()
            .signInWithEmailAndPassword(email, pwd)
            .then(async (user) => {

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

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Login</Text>
            <TextInputComp placeHolder={'Email Id'} value={email} onChangeText={e => setEmail(e)} />
            <TextInputComp placeHolder={'Password'} style={{ marginTop: 8 }} value={pwd} onChangeText={e => setPwd(e)} secureTextEntry={true} />

            <Btn title='Login' onPress={loginHandler} containerStyle={{ marginTop: 25 }} />

            <Text style={styles.forgot}>Forgot Password</Text>

            <Text style={styles.signup}>Don’t have an Account? Please <Text onPress={() => navigation.navigate('Signup')} style={{ color: "#5454D4" }} >Sign Up</Text> here</Text>
        </View>
    )
}

export default LoginScreen

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
    forgot: {
        marginTop: 20,
        color: '#000000',
        alignSelf: 'flex-start',
        fontStyle: 'italic'
    },
    signup: {
        marginTop: 90,
        color: '#000000',
        fontWeight: '500'
    }
})