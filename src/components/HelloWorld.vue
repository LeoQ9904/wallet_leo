<script setup lang="ts">
import AuthenticationComponent from './Auth/AuthenticationComponent.vue'

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="text-lg">{{ msg }}</h1>
    <h3 class="text-lg">
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <AuthenticationComponent />
  </div>
</template>
