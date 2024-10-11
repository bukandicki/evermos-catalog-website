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

    const { left, width } = menuListRef.value.getBoundingClientRect()

    /**
     * Adjust the menu list position if it hits the right edge of the screen.
     * When the list overflows, anchor it to the right to prevent overflow.
     *
    */
    if ((left + width) > window.innerWidth) {
      menuListRef.value.style.left = "unset"
      menuListRef.value.style.right = "0"
    }

    tl.eventCallback("onReverseComplete", () => {
      isActive.value = false
    })

    if (isActive.value) {
      tl.reverse()
      return
    }

    if (tl.reversed()) {
      tl.play()
      return
    }

    const listItems = menuListRef.value.querySelectorAll(".FilterMenu__list li")

    tl.to(menuListRef.value, {
      height: "auto",
      duration: .4,
      ease: "circ.inOut",
      onComplete: () => {
        isActive.value = true
      }
    })
    tl.to(listItems, { stagger: 0.050, duration: .25, opacity: 1, y: 0 }, .25)
  }

  const handleFilterSelected = (value: T) => {
    emit('selected', value)
    tl.reverse()
  }

  useClickOutside(filterMenuRef, () => {
    if (!isActive.value) return

    tl.reverse()
  })
</script>

<template>
  <div ref="filterMenuRef" class="FilterMenu">
    <button :aria-label="`${title} Filter Menu`" class="FilterMenu__trigger" @click="handleShowList">
      <slot name="icon"></slot>

      <LazyAnimatedText :value="title" />
    </button>

    <ul ref="menuListRef" class="FilterMenu__list">
      <li
        v-for="(item, idx) in items"
        :key="idx"
      >
        <button
          @click="() => handleFilterSelected(item.value)"
          :class="[
            'FilterMenu__btn',
            { 'FilterMenu__btn--selected': value === item.value }
          ]"
          :aria-label="`${item.title} ${title}`"
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
