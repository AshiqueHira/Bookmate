import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Btn = ({ title, onPress, containerStyle, titleStyle, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]} disabled={disabled} >
            <Text style={[styles.title, titleStyle]} >{title}</Text>
        </TouchableOpacity>
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
        fontWeight: '700',
        fontSize: 20
    }
})