import { createContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AppContext = createContext();

const AppProvider = props => {



    const [user, setUser] = useState({})

    const contextValue = { user, setUser, getUser: (e) => getUser(e) }

    const getUser = async () => {


        await firestore()
            .collection('Users')
            // Filter results
            .where('email', '==', auth().currentUser.email)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    setUser({ id: doc.id, ...doc.data() })
                })
            });
       
    }



    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider
