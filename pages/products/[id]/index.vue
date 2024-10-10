<script setup lang="ts">
  import StarIcon from "~/assets/icons/star-icon.vue"

  definePageMeta({ name: "CatalogDetaiPage" })

  const route = useRoute()
  const store = useProductStore()

  await store.fetchProductDetail(route.params.id as string)

  const getFormatedDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  useSeoMeta({
    title: store.productDetail?.title,
    description: store.productDetail?.description,
  })
</script>

<template>
  <main class="CatalogDetail">
    <section class="CatalogDetail__wrapper">
      <section class="ProductDetail__overview">
        <NuxtImg
          :src="store.productDetail?.thumbnail"
          :alt="`${store.productDetail?.title} Image`"
          width="720"
          height="720"
          sizes="100vw md:300px lg:720px"
          preload
        />

        <div class="CatalogDetail__gallery">
          <div class="Gallery__item" v-for="imageUrl in store.productDetail?.images" :key="imageUrl">
            <NuxtImg
              :src="imageUrl"
              :alt="`${store.productDetail?.title} Image`"
              width="80"
              height="80"
              sizes="100vw md:100px"
              preload
            />
          </div>
        </div>

        <strong class="CatalogDetail__category">{{ store.productDetail?.category }}</strong>

        <div class="ProductDetail__purchase">
          <button>
            <span>
              Buy / ${{ store.productDetail?.price }} USD
            </span>
          </button>

          <span>* Not include Tax 10%</span>
        </div>
      </section>

      <section class="CatalogDetail__information">
        <span class="Information__brand">{{ store.productDetail?.brand }}</span>

        <h1 class="Information__title">{{ store.productDetail?.title }}</h1>

        <p class="Information__description">{{ store.productDetail?.description }}</p>

        <h2 class="Information__price">
          ${{ store.productDetail?.price }} USD
        </h2>

        <p class="Information__warranty">
          <span>
            {{ store.productDetail?.warrantyInformation }}
          </span>

          <span>
            — {{ store.productDetail?.shippingInformation }}
          </span>
        </p>

        <section class="CatalogDetail__reviews">
          <h2 class="Reviews__headline">Reviews ({{ store.productDetail?.reviews.length }})</h2>

          <ul class="Reviews__list">
            <li
              v-for="review in store.productDetail?.reviews"
              :key="review.reviewerEmail"
              class="Reviews__item"
            >
              <div>
                <span class="Reviews__date">{{ getFormatedDate(review.date) }}</span>

                <div class="Reviews__detail">
                  <strong>{{ review.reviewerName }}: {{ review.rating }}/5</strong>
                  <span>{{ review.reviewerEmail }}</span>
                </div>

                <p class="Reviews__comment">{{ review.comment }}</p>
              </div>

              <div>

              </div>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </main>
</template>

<style lang="scss">
  @import "./ProductDetail.styles.scss";
</style>
