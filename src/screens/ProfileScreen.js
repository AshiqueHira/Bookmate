import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Btn from '../components/Btn'
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
    return (
        <View>
            <Btn onPress={() => auth().signOut()}title='Signout' />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({}) 