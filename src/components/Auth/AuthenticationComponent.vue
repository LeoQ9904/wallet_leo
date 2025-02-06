<template>
  <div>
    <button @click.stop="storePina.signInGoogle()">Sign in with Google</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User'
const storePina = useUserStore()
</script>
