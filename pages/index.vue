<script setup lang="ts">
  import type { FilterMenuItem } from "~/components/FilterMenu/FilterMenu.types";
  import { FILTER_ORDER, PRODUCT_FIELDS } from "~/lib/constants";
  import StarIcon from "~/assets/icons/star-icon.vue"
  import SortIcon from "~/assets/icons/sort-icon.vue"
  import FilterIcon from "~/assets/icons/filter-icon.vue"
  import CategoryIcon from "~/assets/icons/category-icon.vue"

  definePageMeta({ name: "CatalogPage" })

  useSeoMeta({ title: "Catalog" })

  const store = useProductStore()

  const filter = ref<{ category: string; sortBy: string; order: "asc" | "desc"; }>({
    category: "all",
    sortBy: "discountPercentage",
    order: "desc"
  })

  store.fetchCategories()
  store.fetchProducts({
    limit: 12,
    sortBy: { field: filter.value.sortBy, order: filter.value.order }
  })

  const publicProductField = computed(() => {
    return PRODUCT_FIELDS.reduce((filtered, current) => {
      if (current.public) filtered.push({ title: current.title, value: current.name })

      return filtered
    }, [] as FilterMenuItem<string>[])
  })

  const formattedCategoryList = computed(() => {
    let defaultLists = [{ title: "All", value: "all" }]

    if (!store.categories?.length) return defaultLists

    return [
      ...defaultLists,
      ...store.categories.map(category => ({ title: category.name, value: category.slug }))
    ]
  })

  watch(filter, (newVal) => {
    store.fetchProducts({
      category: newVal.category,
      limit: 12,
      sortBy: { field: newVal.sortBy, order: newVal.order }
    })
  }, { deep: true })
</script>

<template>
  <main class="CatalogPage">
    <section class="CatalogPage__hero"></section>

    <section class="CatalogPage__product">
      <div class="Product__filter">
        <div class="Filter__wrapper">
          <FilterMenu
            title="Sort By"
            :value="filter.sortBy"
            :items="publicProductField"
            @selected="filter.sortBy = $event"
          >
            <template #icon>
              <FilterIcon />
            </template>
          </FilterMenu>

          <FilterMenu
            title="Order"
            :value="filter.order"
            :items="FILTER_ORDER"
            @selected="filter.order = $event"
          >
            <template #icon>
              <SortIcon />
            </template>
          </FilterMenu>

          <FilterMenu
            title="Category"
            :value="filter.category"
            :items="formattedCategoryList"
            @selected="filter.category = $event"
          >
            <template #icon>
              <CategoryIcon />
            </template>
          </FilterMenu>
        </div>

        <ul class="Product__categories">
          <li
            v-for="category in formattedCategoryList"
            :key="category.value"
          >
            <button
              :class="[
                'Category__btn',
                { 'Category__btn--selected': filter.category === category.value }
              ]"
              @click="filter.category = category.value"
            >
              {{ category.title }}
            </button>
          </li>
        </ul>
      </div>

      <ol class="Product__items">
        <li
          v-for="product in store.productData?.products"
          :key="product.id"
        >
          <NuxtLink
            class="Product__box"
            :href="`/products/${product.id}`"
          >
            <button class="Product__cta">Add to cart</button>

            <div class="Product__image">
              <NuxtImg
                :src="product.thumbnail"
                :alt="`${product.title} Image`"
                width="300"
                height="300"
                sizes="100vw md:300px lg:540px"
                preload
              />
            </div>

            <div class="Product__detail">
              <strong class="Product__rating">
                <StarIcon />
                {{ product.rating }} ({{ product.reviews.length }} Reviews)
              </strong>

              <strong class="Product__name">
                {{ product.title }}
              </strong>

              <span class="Product__price">
                ${{ product.price }}
              </span>
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
