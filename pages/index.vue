<script setup lang="ts">
  import StarIcon from "~/assets/icons/star-icon.vue"

  definePageMeta({ name: "CatalogPage" })

  useSeoMeta({ title: "Catalog" })

  const store = useProductStore()

  store.fetchCategories()
  store.fetchProducts()
</script>

<template>
  <main class="CatalogPage">
    <section class="CatalogPage__hero"></section>

    <section class="CatalogPage__product">
      <ul class="Product__categories">
        <li v-for="category in store.categories?.slice(0, 5)" :key="category.slug">
          <button>{{ category.name }}</button>
        </li>
      </ul>

      <ol class="Product__items">
        <li class="Product__box" v-for="product in store.productData?.products" :key="product.id">
          <NuxtLink :href="`/products/${product.id}`">
            <button class="Product__cta">Add to cart</button>

            <div class="Product__image">
              <NuxtImg
                :src="product.thumbnail"
                width="300"
                height="300"
                sizes="100vw md:300px lg:540px"
                preload
              />
            </div>

            <div class="Product__detail">
              <strong class="Product__rating">
                <StarIcon width="16" height="16" />
                {{ product.rating }} ({{ product.reviews.length }} Reviews)
              </strong>

              <strong class="Product__name">{{ product.title }}</strong>
              <span class="Product__price">${{ product.price }}</span>
            </div>
          </NuxtLink>
        </li>
      </ol>
    </section>
  </main>
</template>

<style lang="scss">
  @import "./Home.styles.scss";
</style>
