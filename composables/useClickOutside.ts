import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, callback: () => void) {
  const handleClickOutside = (event: MouseEvent) => {
    if (target.value && !target.value.contains(event.target as Node)) {
      callback() // Trigger the callback if click is outside
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
