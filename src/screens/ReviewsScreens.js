import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { BG, BLACK, SEC_TEXT } from '../utils/Colors'
import Header from '../components/Header'
import TextInputComp from '../components/TextInputComp'
import { PROFILE_ICO, REVIEW_ICO } from '../utils/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'
import { getTimeAgo } from '../helpers/getTimeAgo'
const ReviewsScreens = ({ route }) => {

    const { reviews, bookId } = route?.params?.state ?? {}



    const { user } = useContext(AppContext)

    const [review, setReview] = useState('')


    const addReview = async () => {
        if (!review) return
        await firestore()
            .collection('Books')
            .doc(bookId)
            .collection('Reviews')
            .add({
                user,
                review,
                timeStamp: new Date()
            })
            .then(() => {
                console.log('Book added!');
                Alert.alert('Review Added')
            }).catch(() => {
                Alert.alert('Error, Try again.')
            })
    }

    const ReviewItem = ({ review }) => {
        return (
            <View style={styles.rev}>
                <View style={styles.profWrpr} >
                    <Image source={PROFILE_ICO} style={styles.rIco} />
                    <View style={styles.nameWrpr}>
                        <Text style={styles.name}  >{review.user.name}</Text>
                        <Text style={styles.date} >{getTimeAgo(review.timeStamp.toDate())}</Text>
                    </View>
                </View>
                <Text style={styles.reviewTxt} >{review.review}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <Header label='Reviews' from='reviews' />

            <View style={styles.sub} >
                <View style={styles.inputWrpr} >
                    <TextInputComp value={review} onChangeText={(e) => setReview(e)} placeHolder='Write a review...' style={{ flex: 1 }} />
                    <TouchableOpacity onPress={addReview} >
                        <Image source={REVIEW_ICO} style={styles.revIco} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={reviews}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                // style={styles.container}
                />
            </View>
        </View>
    )
}

export default ReviewsScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG,


    },
    sub: {
        padding: 10
    },
    inputWrpr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    revIco: {
        marginLeft: 10,
        width: 25,
        height: 25,
        resizeMode: 'contain',

    },

    rev: {
        padding: 10
    },
    rIco: {
        width: 25,
        height: 25
    },

    profWrpr: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameWrpr: {
        marginLeft: 10
    },
    name: {
        color: BLACK,
        fontWeight: '700'
    },
    date: {
        color: SEC_TEXT
    },
    reviewTxt: {
        color: BLACK
    }
})