import firestore from '@react-native-firebase/firestore';

export const getUser = async (userId) => {
    let data;
    await firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then((doc) => {
            data = { id: doc.id, ...doc.data() }
        })
    return data;
}