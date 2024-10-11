<script setup lang="ts">
  import CartIcon from "~/assets/icons/cart-icon.vue"
  import HeartIcon from "~/assets/icons/heart-icon.vue"
  import MenuIcon from "~/assets/icons/menu-icon.vue"
</script>

<template>
  <header class="Header">
    <div class="Header__controls">
      <button aria-label="Burger Menu">
        <MenuIcon />
      </button>

      <NuxtLink aria-label="Back to home link" href="/">
        <NuxtImg
          format="webp"
          src="/images/evermos-logo.png"
          class="Header__brand"
          alt="Header Brand"
        />
      </NuxtLink>
    </div>

    <nav class="Header__nav">
      <ul class="Nav__list Nav__list--center">
        <li class="Nav__item">
          <button aria-label="About Link Page">
            <LazyAnimatedText value="About" />
          </button>
        </li>
        <li class="Nav__item">
          <button aria-label="Membership Link Page">
            <LazyAnimatedText value="Membership" />
          </button>
        </li>
        <li class="Nav__item">
          <button aria-label="Community Link Page">
            <LazyAnimatedText value="Community" />
          </button>
        </li>
        <li class="Nav__item">
          <button aria-label="Blog Link Page">
            <LazyAnimatedText value="Blog" />
          </button>
        </li>
      </ul>

      <ul class="Nav__list Nav__list--right">
        <li class="Nav__item">
          <button aria-label="Favorite Stuff">
            <HeartIcon />
          </button>
        </li>
        <li class="Nav__item">
          <button aria-label="Cart">
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
