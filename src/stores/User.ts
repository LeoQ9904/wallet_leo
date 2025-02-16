import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GoogleAuthProvider, signInWithPopup, type User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../providers/firebase.ts'
import router from '@/router/index.ts'
import { doc, setDoc } from "firebase/firestore";

export const useUserStore = defineStore('user', () => {

  const provider = new GoogleAuthProvider()

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  // This is function get user from store
  function getUser() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
    return user.value
  }

  // This is function to set user to store
  function setUser(newUser: User | null) {
    localStorage.setItem('user', newUser ? JSON.stringify(newUser) : '')
    user.value = newUser
  }

  // This is function to sign out from store
  function signOut() {
    localStorage.removeItem('user')
    user.value = null
  }

  // This is function to login from store
  async function signInGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      redirectToAbout()
    } catch (error) {
      console.log(error)
    }
  }

  // This is function to login from facebook
  async function signInFacebook() {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.log(error)
    }
  }

  // This is function to login from email and password
  async function singInEmailAndPassword(email: string = 'qqjq9904@gmail.com', password: string = 'Juanjo2712') {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser(result.user)
      redirectToAbout()
    } catch (error) {
      console.log(error)
    }
  }

  //This is function to create user with email and password
  async function createUserEmailPass(email: string, password: string, name: string, phone: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (result.user) {
        const userRef = doc(db, "users", result.user.uid);
        await setDoc(userRef, {
          email: result.user.email,
          displayName: name,
          phoneNumber: phone
        });
        setUser(result.user)
        redirectToAbout()
      }
    } catch (error) {
      console.log(error)
    }
  }

  //This id function redirects the user to the About page
  function redirectToAbout() {
    router.push({ name: 'about' })
  }
  return { isAuthenticated, user, getUser, setUser, signOut, signInGoogle, signInFacebook, singInEmailAndPassword, createUserEmailPass }
})
