<script setup lang="ts">
  import CartIcon from "~/assets/icons/cart-icon.vue"
  import HeartIcon from "~/assets/icons/heart-icon.vue"
</script>

<template>
  <header class="Header">
    <NuxtLink href="/">
      <NuxtImg
        src="/images/evermos-logo.png"
        class="Header__brand"
      />
    </NuxtLink>

    <nav class="Header__nav">
      <ul class="Nav__list Nav__list--center">
        <li class="Nav__item">
          <button>About</button>
        </li>
        <li class="Nav__item">
          <button>Membership</button>
        </li>
        <li class="Nav__item">
          <button>Community</button>
        </li>
        <li class="Nav__item">
          <button>Blog</button>
        </li>
      </ul>

      <ul class="Nav__list Nav__list--right">
        <li class="Nav__item">
          <button>
            <HeartIcon width="22" height="22" />
          </button>
        </li>
        <li class="Nav__item">
          <button>
            <CartIcon width="22" height="22" />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
  @import "./Header.styles.scss";
</style>
