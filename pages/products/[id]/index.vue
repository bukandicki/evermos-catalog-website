<script setup lang="ts">
  import gsap from 'gsap';

  definePageMeta({ name: "CatalogDetaiPage" })

  const route = useRoute()
  const store = useProductStore()
  const img = useImage()

  await store.fetchProductDetail(route.params.id as string)

  const activeImage = ref<string>("")

  const getFormatedDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const handlePreview = (url: string) => {
    if (url === activeImage.value) return

    activeImage.value = url

    const currentImg = document.querySelector(".Overview__img") as HTMLImageElement
    const overviewSection = document.querySelector(".ProductDetail__overview") as HTMLElement

    const imgEl = document.createElement("img")

    const optimizedUrl = img(url, { format: "webp" })
    const _srcset = img.getSizes(url, {
      sizes: "100vw md:300px lg:720px",
      modifiers: {
        format: "webp",
        width: 720,
        height: 720,
        quality: 40
      }
    })

    imgEl.src = optimizedUrl
    imgEl.classList.add("Overview__img")
    imgEl.width = 720
    imgEl.height = 720
    imgEl.style.transform = "scale(.95)"
    imgEl.style.opacity = "0"
    imgEl.srcset = _srcset.srcset
    imgEl.sizes = _srcset.sizes as string

    currentImg.remove()
    overviewSection.prepend(imgEl)

    const tl = gsap.timeline({
      defaults: { ease: "" }
    })

    imgEl.onload = function () {
      tl.to(imgEl, { scale: 1, opacity: 1 })
    }
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
          format="webp"
          class="Overview__img"
          preload
        />

        <div class="Overview__gallery">
          <div
            :class="[
              'Gallery__item',
              { 'Gallery__item--active': activeImage === imageUrl }
            ]"
            v-for="imageUrl in store.productDetail?.images"
            :key="imageUrl"
            @mouseenter="() => handlePreview(imageUrl)"
          >
            <NuxtImg
              :src="imageUrl"
              :alt="`${store.productDetail?.title} Image`"
              width="80"
              height="80"
              sizes="100vw md:100px"
              format="webp"
              preload
            />
          </div>
        </div>

        <strong class="Overview__category">
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
