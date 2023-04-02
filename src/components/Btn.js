import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Btn = ({ title, onPress, containerStyle, titleStyle }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <Text style={[styles.title, titleStyle]} >{title}</Text>
        </View>
    )
}

export default Btn

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#FEDC5A',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#000000',
        fontWeight:'700',
        fontSize:20
    }
})