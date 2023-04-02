import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputComp = ({ placeHolder, onChangeText, style }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeHolder}
            onChangeText={onChangeText}
            placeholderTextColor='#454546'
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
    }
})