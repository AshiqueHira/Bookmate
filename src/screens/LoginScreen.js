import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.title} >Login</Text>
            <TextInputComp placeHolder={'Email Id'} />
            <TextInputComp placeHolder={'Password'} style={{ marginTop: 8 }} />

            <Btn title='Login' containerStyle={{ marginTop: 25 }} />

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