import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfing';
import axios from 'axios'; // ⬅️ import axios

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ signUp
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ signIn
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Google login
  const singInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Update profile
  const updateProfileUser = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  // ✅ onAuthStateChanged & JWT token fetch
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const jwtRes = await axios.post('https://ph-project-12-server.vercel.app/jwt', {
            email: currentUser.email,
          });

          const token = jwtRes.data.token;

          // ✅ Save token
          localStorage.setItem('edu-token', token);
          console.log('JWT saved:', token);
        } catch (err) {
          console.error('JWT fetch failed:', err);
        }
      } else {
        // ✅ Remove token if user logs out
        localStorage.removeItem('edu-token');
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    singIn,
    logOut,
    updateProfileUser,
    singInWithGoogle,
    user,
    loading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
