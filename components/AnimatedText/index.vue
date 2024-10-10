<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

  const props = defineProps<{ value: string }>()

  const splitedText = computed(() => {
    return props.value.split(/(\s+)/)
  })

  onMounted(() => {
    ScrollTrigger.batch(".AnimatedText", {
      once: true,
      onEnter: (elements) => {
        elements.forEach((container, idx) => {
          const wordElements = container.querySelectorAll(".AnimatedText__word")

          gsap.to(wordElements, {
            y: 0,
            delay: 0.080 * idx,
            duration: .85,
            ease: "power2.out"
          })
        })
      }
    })
  })
</script>

<template>
  <span class="AnimatedText">
    <template
      v-for="(text, idx) in splitedText"
      :key="idx"
    >
      <span
        v-if="text !== ' '"
        class="AnimatedText__mask"
      >
        <span class="AnimatedText__word">{{ text }}</span>
      </span>

      <template v-else>{{ " " }}</template>
    </template>
  </span>
</template>

<style lang="scss">
  @import "./AnimatedText.scss";
</style>
