import type { ProductCategoryType, ProductDataResponse } from "~/lib/types"

export const useProductStore = defineStore("product", () => {
  const { public: { baseApi } } = useRuntimeConfig()

  const productData = ref<ProductDataResponse | null>(null)
  const categories = ref<ProductCategoryType[] | null>([])

  async function fetchCategories() {
    const { data } = await useFetch<
      ProductCategoryType[]
    >(`${baseApi}/products/categories?limit=5`)

    categories.value = data.value
  }

  async function fetchProducts() {
    const fields = [
      "id",
      "title",
      "price",
      "description",
      "reviews",
      "category",
      "thumbnail",
      "availabilityStatus",
      "rating",
      "discountPercentage"
    ]

    const { data } = await useFetch<
      ProductDataResponse
    >(`${baseApi}/products?limit=12&select=${fields.join(",")}`)

    productData.value = data.value
  }

  return { productData, categories, fetchCategories, fetchProducts }
})
