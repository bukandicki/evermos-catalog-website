<script setup lang="ts" generic="T">
  import type { FilterMenuItem } from './FilterMenu.types';
  import gsap from "gsap"

  let tl: gsap.core.Timeline

  if (typeof window !== "undefined") tl = gsap.timeline()

  const props = defineProps<{
    title: string;
    items: FilterMenuItem<T>[]
    value: T
  }>()

  const emit = defineEmits<{ selected: [value: T] }>()

  const filterMenuRef = ref<HTMLDivElement | null>(null)
  const menuListRef = ref<HTMLUListElement | null>(null)
  const isActive = ref<boolean>(false)

  const handleShowList = () => {
    if (!menuListRef.value) return

    console.log(tl);

    if (tl.reversed()) {
      tl.play()
      return
    }

    const listItems = menuListRef.value.querySelectorAll(".FilterMenu__list li")

    tl.to(menuListRef.value, {
      height: "auto",
      duration: .5,
      ease: "circ.inOut",
      onComplete: () => {
        isActive.value = true
      }
    })
    tl.to(listItems, { stagger: 0.050, opacity: 1, y: 0 }, .3)
  }

  const handleFilterSelected = (value: T) => {
    emit('selected', value)
    tl.reverse()
  }

  useClickOutside(filterMenuRef, () => {
    if (!isActive.value) return

    tl.eventCallback("onReverseComplete", () => {
      isActive.value = false
    })

    tl.reverse()
  })
</script>

<template>
  <div ref="filterMenuRef" class="FilterMenu">
    <button class="FilterMenu__trigger" @click="handleShowList">
      <slot name="icon" />

      <span>{{ props.title }}</span>
    </button>

    <ul ref="menuListRef" class="FilterMenu__list">
      <li
        v-for="(item, idx) in props.items"
        :key="idx"
      >
        <button
          @click="() => handleFilterSelected(item.value)"
          :class="[
            'FilterMenu__btn',
            { 'FilterMenu__btn--selected': value === item.value }
          ]"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "./FilterMenu.styles.scss";
</style>
