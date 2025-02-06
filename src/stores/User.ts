import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth'
import { auth } from '../providers/firebase.ts'

export const useUserStore = defineStore('user', () => {

  const provider = new GoogleAuthProvider()

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  // This is function get user from store
  function getUser() {
    return user.value
  }

  // This is function to set user to store
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  // This is function to sign out from store
  function signOut() {
    user.value = null
  }

  // This is function to login from store
  async function signInGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.log(error)
    }
  }

  return { isAuthenticated, user, getUser, setUser, signOut, signInGoogle }
})
