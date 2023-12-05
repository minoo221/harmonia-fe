<template>
  <v-app>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#EF233C" :height="7" />
      <NuxtPage />
      <CookieControl locale="sk" />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts"></script>

<style scoped></style>
