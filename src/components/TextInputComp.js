import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { BLACK } from '../utils/Colors'

const TextInputComp = ({ placeHolder, onChangeText, style }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeHolder}
            onChangeText={onChangeText}
            placeholderTextColor='gray'
        />
    )
}

export default TextInputComp

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,
        color: BLACK
    }
})