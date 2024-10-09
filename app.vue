<script setup lang="ts">
  useHead({
    titleTemplate: (template) => {
      return template ? `Evermos — ${template}` : 'Evermos';
    }
  })
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
