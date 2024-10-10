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

        <strong class="CatalogDetail__category">
          <LazyAnimatedText
            :value="(store.productDetail?.category as string) || ''"
          />
        </strong>

        <div class="ProductDetail__purchase">
          <button>
            <LazyAnimatedText
              :value="`Buy / $${store.productDetail?.price} USD`"
            />
          </button>

          <LazyAnimatedText
            value="* Not include Tax 10%"
          />
        </div>
      </section>

      <section class="CatalogDetail__information">
        <LazyAnimatedText
          class="Information__brand"
          :value="(store.productDetail?.brand as string) || ''"
        />

        <h1 class="Information__title">
          <LazyAnimatedText
            :value="(store.productDetail?.title as string)"
          />
        </h1>

        <p class="Information__description">
          <LazyAnimatedText
            :value="(store.productDetail?.description as string)"
          />
        </p>

        <h2 class="Information__price">
          <LazyAnimatedText
            :value="`$${store.productDetail?.price} USD`"
          />
        </h2>

        <p class="Information__warranty">
          <LazyAnimatedText
            :value="(store.productDetail?.warrantyInformation as string)"
          />

          <LazyAnimatedText
            :value="`— ${store.productDetail?.shippingInformation}`"
          />
        </p>

        <section class="CatalogDetail__reviews">
          <h2 class="Reviews__headline">
            <LazyAnimatedText
              :value="`Reviews (${store.productDetail?.reviews.length})`"
            />
          </h2>

          <ul class="Reviews__list">
            <li
              v-for="review in store.productDetail?.reviews"
              :key="review.reviewerEmail"
              class="Reviews__item"
            >
              <div>
                <LazyAnimatedText
                  class="Reviews__date"
                  :value="getFormatedDate(review.date)"
                />

                <div class="Reviews__detail">
                  <strong>
                    <LazyAnimatedText
                      :value="`${review.reviewerName} — (${review.rating} / 5)`"
                    />
                  </strong>

                  <LazyAnimatedText
                    :value="review.reviewerEmail"
                  />
                </div>

                <p class="Reviews__comment">
                  <LazyAnimatedText
                    :value="review.comment"
                  />
                </p>
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
