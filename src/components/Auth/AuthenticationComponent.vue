<template>
  <div class="tf-container">
    <div class="mt-32">
      <h2 class="text-center">Login Wallet</h2>
      <ul class="mt-40 socials-login">
        <li class="mt-12">
          <a class="tf-btn md social dark" @click.stop="storeUser.signInGoogle()"
            ><img
              alt="img"
              loading="lazy"
              width="31"
              height="31"
              decoding="async"
              data-nimg="1"
              style="color: transparent"
              src="../../assets/img/logo/icons/fb.jpg"
            />Continue with Facebook</a
          >
        </li>
        <li class="mt-12">
          <a class="tf-btn md social dark" @click.stop="storeUser.signInGoogle()"
            ><img
              alt="img"
              loading="lazy"
              width="21"
              height="20"
              decoding="async"
              data-nimg="1"
              style="color: transparent"
              src="../../assets/img/logo/icons/google.jpg"
            />Continue with Google</a
          >
        </li>
      </ul>
    </div>
    <div class="auth-line mt-12">Or</div>
    <form class="mt-16">
      <fieldset class="mt-16">
        <label class="label-ip"
          ><p class="mb-8 text-small">Email</p>
          <input placeholder="Example@gmail" type="email"
        /></label>
      </fieldset>
      <fieldset class="mt-16 mb-12">
        <label class="label-ip"
          ><p class="mb-8 text-small">Password</p>
          <div class="box-auth-pass">
            <input
              required
              placeholder="Your password"
              class="password-field"
              type="password"
            /></div
        ></label>
      </fieldset>
      <a class="text-secondary">Forgot Password?</a
      ><button class="mt-20" @click.stop="storeUser.singInEmailAndPassword()">Login</button>
      <p class="mt-20 text-center text-small">
        Already have a Account? <a href="/register">Sign up</a>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/User'
const storeUser = useUserStore()

onMounted(() => {
  storeUser.getUser()
})
</script>

<style></style>
