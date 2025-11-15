// @flow strict
import * as React from "react";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import axios from "axios";
import toast from "react-hot-toast";

// ----------------- Auth Context -----------------
export const AuthContext = createContext();

// ----------------- AuthProvider -----------------
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------- Firebase Auth Methods -----------------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  // ----------------- Listen to Auth Changes -----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ----------------- Axios Instance with JWT -----------------
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000",
    });

    // Attach JWT token to requests
    instance.interceptors.request.use(async (config) => {
      if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser, true);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 / 403 globally
    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err.response?.status;
        if (status === 401) {
          toast.error("Session expired. Please login again.");
          await logOut();
        } else if (status === 403) {
          toast.error("Access denied. You do not have permission.");
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []);

  // ----------------- Context Value -----------------
  const value = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    api, // use this for all API calls
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ----------------- Custom Hook -----------------
export const useApi = () => {
  const { api } = useContext(AuthContext);
  return api;
};
