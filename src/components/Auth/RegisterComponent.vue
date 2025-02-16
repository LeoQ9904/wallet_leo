<script setup lang="ts">
import { useUserStore } from '@/stores/User'
import { computed, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const storeUser = useUserStore()
const isLoading = ref(false)
interface userData {
  name: string
  mail: string
  phone: string
  passOne: string
  passTwo: string
}

const from: userData = reactive({
  name: '',
  mail: '',
  phone: '',
  passOne: '',
  passTwo: '',
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Name is required', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3)),
  },
  mail: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Invalid email', email),
  },
  phone: {
    required: helpers.withMessage('Phone number is required', required),
    minLength: helpers.withMessage('Phone number must be at least 10 characters', minLength(10)),
  },
  passOne: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be at least 6 characters', minLength(6)),
  },
  passTwo: {
    sameAsPassword: helpers.withMessage('Passwords must match', sameAs(ref(from.passOne))),
  },
}))

const v$ = useVuelidate(rules, from)

const register = async () => {
  v$.value.$validate()
  if (v$.value.$error) {
    return
  }
  isLoading.value = true
  await storeUser.createUserEmailPass(from.mail, from.passOne, from.name, from.phone)
}
</script>
<template>
  <Loading v-model:active="isLoading" />
  <div class="tf-container">
    <form class="mt-32 mb-16" @submit.prevent="register()">
      <h2 class="text-center">Register Wallet</h2>
      <fieldset class="mt-40">
        <label class="label-ip"
          ><p class="mb-8 text-small">Name</p>
          <input type="text" v-model="from.name" placeholder="Name example" required />
          <span v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
        </label>
      </fieldset>
      <fieldset class="mt-16">
        <label class="label-ip"
          ><p class="mb-8 text-small">Email</p>
          <input placeholder="Example@gmail" type="email" v-model="from.mail" required />
          <span v-if="v$.mail.$error">{{ v$.mail.$errors[0].$message }}</span></label
        >
      </fieldset>
      <fieldset class="mt-16">
        <label class="label-ip"
          ><p class="mb-8 text-small">Phone Number</p>
          <input placeholder="Phone number" type="text" v-model="from.phone" required />
          <span v-if="v$.phone.$error">{{ v$.phone.$errors[0].$message }}</span></label
        >
      </fieldset>
      <fieldset class="mt-16">
        <label class="label-ip"
          ><p class="mb-8 text-small">Password</p>
          <div class="box-auth-pass">
            <input
              required
              placeholder="6 -20 characters"
              class="password-field"
              type="password"
              v-model="from.passOne"
            />
          </div>
          <span v-if="v$.passOne.$error">{{ v$.passOne.$errors[0].$message }}</span>
        </label>
      </fieldset>
      <fieldset class="mt-16">
        <label class="label-ip"
          ><p class="mb-8 text-small">Confirm Password</p>
          <div class="box-auth-pass">
            <input
              required
              placeholder="confirm password"
              class="password-field2"
              type="password"
              v-model="from.passTwo"
            />
          </div>
          <span v-if="v$.passTwo.$error">{{ v$.passTwo.$errors[0].$message }}</span>
        </label>
      </fieldset>
      <button class="mt-40">Create an account</button>
    </form>
  </div>
</template>
