<script setup lang="ts">
  definePageMeta({ name: "CatalogPage" })

  const { productData, categories, fetchCategories, fetchProducts } = useProductStore()

  fetchCategories()
  fetchProducts()

  useSeoMeta({ title: "Catalog" })
</script>

<template>
  <main class="CatalogPage">
    <section class="CatalogPage__hero"></section>

    <section class="CatalogPage__product">
      <ul class="Product__categories">
        <li v-for="category in categories?.slice(0, 5)" :key="category.slug">
          <button>{{ category.name }}</button>
        </li>
      </ul>

      <ol class="Product__items">
        <li class="Product__box" v-for="product in productData?.products" :key="product.id">
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
            <strong class="Product__name">{{ product.title }}</strong>
            <span class="Product__price">${{ product.price }}</span>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<style lang="scss">
  @import "./Home.styles.scss";
</style>
