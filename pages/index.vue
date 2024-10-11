<script setup lang="ts">
  import type { FilterMenuItem } from "~/components/FilterMenu/FilterMenu.types";
  import { FILTER_ORDER, PRODUCT_FIELDS } from "~/lib/constants";
  import type { FilterType } from "~/lib/types";

  import gsap from "gsap";

  import StarIcon from "~/assets/icons/star-icon.vue"
  import SortIcon from "~/assets/icons/sort-icon.vue"
  import FilterIcon from "~/assets/icons/filter-icon.vue"
  import CategoryIcon from "~/assets/icons/category-icon.vue"

  definePageMeta({ name: "CatalogPage" })

  useSeoMeta({ title: "Catalog" })

  const store = useProductStore()

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

  const isAllProductsLoaded = computed(() => {
    return (store.productData?.products.length as number) >= (store.filter.totalProducts as number)
  })

  const handleCategorySelected = <T extends keyof FilterType>(
    key: T, value: FilterType[T]
  ) => {
    store.filter.skip = 0
    store.filter.totalProducts = 0
    store.filter[key] = value
  }

  const handleInfiniteScroll = () => {
    const scrollProgress = document.documentElement.scrollTop + window.innerHeight
    const scrollHeight = document.documentElement.scrollHeight

    const reachBottom = scrollProgress >= scrollHeight

    if (
      reachBottom &&
      !store.loadingStates.productList &&
      !isAllProductsLoaded.value
    ) {
      store.filter.skip += 4
    }
  }

  await useAsyncData("categories", () => store.fetchCategories())
  await useAsyncData("products", () => store.fetchProducts(), {
    watch: [store.filter]
  })

  onMounted(() => {
    const heroTimeline = gsap.timeline({
      defaults: {
        duration: .5,
        ease: "circ.inOut"
      }
    })

    window.addEventListener("scroll", handleInfiniteScroll)

    heroTimeline
      .to("#Hero__img-1", { y: 0 })
      .to("#Hero__img-2", { y: 0 }, .25)
      .to("#Hero__img-3", { y: 0 }, .3)
      .to("#Hero__img-4", { y: 0 }, .45)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleInfiniteScroll)
  })
</script>

<template>
  <main class="CatalogPage">
    <section class="CatalogPage__hero">
      <div class="Hero">
        <h1 class="Hero__tagline">
          <LazyAnimatedText
            value="Epic Savings Ahead! Your Ultimate Solutions Await!"
          />
        </h1>

        <p class="Hero__caption">
          <LazyAnimatedText
            value="Join the excitement of amazing savings on all the solutions you need. Let's make your dreams a reality without the hefty price tag!"
          />
        </p>
      </div>

      <NuxtImg
        id="Hero__img-1"
        src="/images/hero-image-1.png"
        width="500"
        sizes="100vw md:300px"
        format="webp"
        preload
      />

      <NuxtImg
        id="Hero__img-2"
        src="/images/hero-image-2.png"
        width="700"
        sizes="100vw md:300px"
        format="webp"
        preload
      />

      <NuxtImg
        id="Hero__img-3"
        src="/images/hero-image-3.png"
        width="400"
        sizes="100vw md:300px"
        format="webp"
        preload
      />

      <NuxtImg
        id="Hero__img-4"
        src="/images/hero-image-4.png"
        width="300"
        sizes="100vw md:300px"
        format="webp"
        preload
      />
    </section>

    <section class="CatalogPage__product">
      <div class="Product__filter">
        <div class="Filter__wrapper">
          <LazyFilterMenu
            title="Sort By"
            :value="store.filter.sortBy"
            :items="publicProductField"
            @selected="(val) => handleCategorySelected('sortBy', val)"
          >
            <template #icon>
              <FilterIcon />
            </template>
          </LazyFilterMenu>

          <LazyFilterMenu
            title="Order"
            :value="store.filter.order"
            :items="FILTER_ORDER"
            @selected="(val) => handleCategorySelected('order', val)"
          >
            <template #icon>
              <SortIcon />
            </template>
          </LazyFilterMenu>

          <LazyFilterMenu
            title="Category"
            :value="store.filter.category"
            :items="formattedCategoryList"
            @selected="(val) => handleCategorySelected('category', val)"
          >
            <template #icon>
              <CategoryIcon />
            </template>
          </LazyFilterMenu>
        </div>

        <ul class="Product__categories">
          <li
            v-for="category in formattedCategoryList"
            :key="category.value"
          >
            <button
              :class="[
                'Category__btn',
                { 'Category__btn--selected': store.filter.category === category.value }
              ]"
              @click="() => handleCategorySelected('category', category.value)"
            >
              <LazyAnimatedText
                :value="category.title"
              />
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
                sizes="100vw md:300px"
                format="webp"
                preload
              />
            </div>

            <div class="Product__detail">
              <strong class="Product__rating">
                <StarIcon />

                <LazyAnimatedText
                  :value="`${product.rating} (${product.reviews.length} Reviews)`"
                />
              </strong>

              <strong class="Product__name">
                <LazyAnimatedText
                  :value="product.title"
                />
              </strong>

              <LazyAnimatedText
                class="Product__price"
                :value="`$${product.price}`"
              />
            </div>
          </NuxtLink>
        </li>
      </ol>

      <div class="Product__message">
        <span
          v-if="store.loadingStates.productList"
        >
          More goodies incoming!
        </span>

        <span
          v-if="isAllProductsLoaded"
        >
          {{ store.productData?.products.length }} /
          {{ store.filter.totalProducts }} —
          That's it — you've seen it all!
        </span>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  @import "./Home.styles.scss";
</style>
