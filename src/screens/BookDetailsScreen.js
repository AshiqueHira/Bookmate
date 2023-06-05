import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { BG, BLACK, SEC_TEXT } from '../utils/Colors'
import { WIDTH } from '../utils/constants'
import { Recomendation_ICO, REQUEST_ICO, REVIEW_ICO, STAR_ICO } from '../utils/icons'
import { ddmmyyy } from '../helpers/ddmmyyyy'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../contexts/AppProvider'

const BookDetailsScreen = ({ route, navigation }) => {

    const { email,
        name,
        author,
        cat,
        city,
        town,
        dsc,
        img,
        timeStamp,
        uploadedBy,
        recomendations,
        id
    } = route.params.book


    const { user } = useContext(AppContext)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [recoms, setRecoms] = useState(recomendations ?? [])
    const [reviews, setReviews] = useState([])
    const onRequestPress = (type) => {
        Alert.alert('New Request', `Do you want to send ${type} request for this book?`, [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => makeRequest(type) },
        ]);
    }

    const onRecomendPress = async () => {
        await firestore()
            .collection('Books')
            .doc(id)
            .update({
                recomendations: firestore.FieldValue.arrayUnion(user.id)
            })
            .then(() => {
                setRecoms([...recomendations, user.id])
            }).catch((err) => {
                console.log(err)
                Alert.alert('Error, Try again.')
            })


    }
    const getReviews = async () => {
        const tmpRevs = []
        await firestore()
            .collection('Books')
            .doc(id)
            .collection('Reviews')
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {
                    tmpRevs.push({ id: doc.id, ...doc.data() })
                });
            });
        setReviews(tmpRevs)
    }
    const makeRequest = async (type) => {
        await firestore()
            .collection('Notifications')
            .add({
                users: [uploadedBy.id, user.id],
                to: uploadedBy.id,
                from: user.id,
                book: route.params.book,
                status: 'send',
                timeStamp: new Date(),
                type,
                ...(type == 'swap' && { swapScore: 0 })
            })
            .then(() => {
                console.log('Book added!');
                setShowRequestModal(false)
                Alert.alert('Request Send')
            }).catch(() => {
                Alert.alert('Error, Try again.')
            })
    }


    useEffect(() => {
        if (id) {
            getReviews()
        }
    }, [id])

    return (
        <View style={styles.container} >
            <Header label='Bookmate' from='bookDetails' right={uploadedBy?.id == user?.id ?
                <TouchableOpacity onPress={() => navigation.navigate('AddBook', { book: route.params.book })}><Image source={REVIEW_ICO} style={styles.editIco} /></TouchableOpacity> : null} />

            <ScrollView>
                <View style={styles.profWrpr} >
                    {/* <Image source={{ uri: img }} style={styles.profIco} /> */}
                    <Text style={styles.profName} >{author}</Text>
                    <Image source={STAR_ICO} style={styles.star} />
                    <Text style={styles.profName}>210</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.date}>Posted on {ddmmyyy(timeStamp.toDate())}</Text>
                </View>
                <Image source={{ uri: img }} style={styles.img} />
                <View style={styles.wrpr} >
                    <Text style={styles.title} >{name}</Text>
                    <Text style={styles.cat} >Category: {cat}  </Text>
                    <Text style={styles.loc}>Location: {city}</Text>

                    <View style={styles.subWrpr}>
                        <TouchableOpacity onPress={onRecomendPress} disabled={recoms.includes(user.id)} >
                            <Image style={styles.ico} source={Recomendation_ICO} />
                            <Text style={styles.icoTxt}>{recoms.length} Recommendations</Text>
                        </TouchableOpacity>
                        {user.id != uploadedBy.id && <TouchableOpacity onPress={() => setShowRequestModal(true)} style={{ alignItems: 'center' }} >
                            <Image style={{ width: 30, height: 30 }} source={REQUEST_ICO} />
                            <Text style={styles.icoTxt}>Request</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
                <View style={styles.wrpr2}>
                    <View style={styles.dscWrpr}  >
                        <Text style={styles.dsc}>Description </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Reviews', { state: { bookId: id, reviews } })} ><Text style={[styles.dsc, { marginLeft: 10, fontWeight: '700' }]} >Reviews {reviews.length}</Text></TouchableOpacity>
                    </View>

                    <Text style={{ color: BLACK }} >{dsc}</Text>
                </View>
            </ScrollView>


            {/* Request Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showRequestModal}
                onRequestClose={() => {
                    setShowRequestModal(!showRequestModal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={styles.modalTitle}>Request for</Text>
                            <TouchableOpacity onPress={() => setShowRequestModal(false)} >
                                <Text style={styles.modalTitle}>x</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => onRequestPress('swap')}>
                            <View style={styles.mBtn}>
                                <Text style={styles.mBtnTxt}>Swap</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onRequestPress('grant')} >
                            <View style={styles.mBtn}>
                                <Text style={styles.mBtnTxt}>Grant</Text>

                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>



        </View>
    )
}

export default BookDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG,


    },
    editIco: {
        width: 20,
        height: 20
    },
    profWrpr: {
        marginTop: 18,
        marginBottom: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profIco: {
        height: 20,
        width: 20,
        borderRadius: 100,

    },
    profName: {
        color: BLACK,
        fontWeight: 500,
        marginLeft: 8
    },
    star: {
        marginLeft: 5,
        height: 20,
        width: 20,
        objectFit: 'contain'
    },
    date: {
        fontSize: 12,
        fontWeight: 400,
        color: SEC_TEXT
    },
    img: {
        width: WIDTH,
        height: WIDTH
    },
    wrpr: {
        padding: 12,
        width: WIDTH,
    },
    title: {
        fontSize: 20,
        fontWeight: 400,
        color: BLACK
    },
    cat: {
        marginVertical: 8,
        color: SEC_TEXT
    },
    loc: {
        fontSize: 12,
        color: BLACK
    },
    subWrpr: {
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ico: {
        height: 35,
        width: 35,
        marginLeft: 10
    },
    icoTxt: {
        color: BLACK,
        fontSize: 12
    },
    wrpr2: {
        padding: 12,
        width: WIDTH,
    },
    dsc: {
        paddingBottom: 10,
        color: BLACK,
        fontSize: 13,
    },
    dscWrpr: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1
    },

    // Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: WIDTH / 1.5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        color: BLACK,
        fontSize: 18,
        fontWeight: "700"
    },
    mBtn: {
        width: '100%',
        borderWidth: 1,
        borderColor: BLACK,
        padding: 5,
        borderRadius: 10,
        marginBottom: 10
    },
    mBtnTxt: {
        marginLeft: 10,
        color: BLACK,
        fontSize: 15
    }
})