import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfing';

const googleProvider =new GoogleAuthProvider()
const AuthProvider = ({children}) => {

    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)

    // singUP
const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}
// singIn
const singINUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

// logOut
const logOut=()=>{
    setLoading(true)
    return signOut(auth)
}
// googoleLogin
    const singInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

// 
useEffect(()=>{
const unSubscribe =  onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser);
    setLoading(false)
});
return()=>{
    unSubscribe();
}

} ,[])




const authInfo={
    createUser,
    singINUser,
    logOut,
    singInWithGoogle,
    user,
    loading,

}

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;