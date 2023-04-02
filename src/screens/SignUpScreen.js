import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputComp from '../components/TextInputComp'
import Btn from '../components/Btn'

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.title} >Sign Up</Text>

            <TextInputComp placeHolder={'Name'} />
            <TextInputComp placeHolder={'User Name'} style={{ marginTop: 8 }} />
            <TextInputComp placeHolder={'Phone Number'} style={{ marginTop: 8 }} />
            <TextInputComp placeHolder={'Email Id'} style={{ marginTop: 8 }} />
            <TextInputComp placeHolder={'Password'} style={{ marginTop: 8 }} />
            <TextInputComp placeHolder={'Confirm Password'} style={{ marginTop: 8 }} />

            <Btn title='Sign Up' containerStyle={{ marginTop: 25 }} />


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