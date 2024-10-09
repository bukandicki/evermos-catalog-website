<script setup lang="ts">
  import CartIcon from "~/assets/icons/cart-icon.vue"
  import HeartIcon from "~/assets/icons/heart-icon.vue"
  import MenuIcon from "~/assets/icons/menu-icon.vue"
</script>

<template>
  <header class="Header">
    <div class="Header__controls">
      <button>
        <MenuIcon />
      </button>

      <NuxtLink href="/">
        <NuxtImg
          src="/images/evermos-logo.png"
          class="Header__brand"
        />
      </NuxtLink>
    </div>

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
            <HeartIcon />
          </button>
        </li>
        <li class="Nav__item">
          <button>
            <CartIcon />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
  @import "./Header.styles.scss";
</style>
