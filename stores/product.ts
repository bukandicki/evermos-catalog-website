import type {
  FilterType,
  ProductCategoryType,
  ProductDataResponse,
  ProductDetailType,
  ProductType
} from "~/lib/types"
import { PRODUCT_FIELDS } from "~/lib/constants"

export const useProductStore = defineStore("product", () => {
  const { public: { baseApi } } = useRuntimeConfig()

  const loadingStates = ref({
    categories: false,
    productList: false,
    productDetail: false,
  })
  const productDetail = ref<ProductDetailType | null>(null)
  const productData = ref<ProductDataResponse | null>(null)
  const filter = ref<FilterType>({
    category: "all",
    limit: 8,
    skip: 0,
    totalProducts: undefined,
    sortBy: "discountPercentage",
    order: "desc"
  })
  const categories = ref<ProductCategoryType[] | null>([])

  const productFieldNames = PRODUCT_FIELDS.map(f => f.name).join(",")

  async function fetchCategories(): Promise<void> {
    try {
      loadingStates.value.categories = true

      const data = await $fetch<
        ProductCategoryType[]
      >(`${baseApi}/products/categories?limit=5`)

      categories.value = data.slice(0, 5)
    } catch (err) {
      console.error(err)
    } finally {
      loadingStates.value.categories = false
    }
  }

  async function fetchProducts(init?: boolean): Promise<void> {
    try {
      let path = `${baseApi}/products`

      if (filter.value.category && filter.value.category !== "all") path += `/category/${filter.value.category}`

      loadingStates.value.productList = true

      const data = await $fetch<ProductDataResponse>(path, {
        cache: "force-cache",
        query: {
          limit: filter.value.limit,
          skip: filter.value.skip,
          sortBy: filter.value.sortBy,
          order: filter.value.order,
        }
      })

      if (init) {
        filter.value.limit = 4
        filter.value.skip = 8
      }

      if (productData.value && filter.value.skip) {
        productData.value.products = [
          ...productData.value.products,
          ...data.products as ProductType[]
        ]
      }
      else {
        filter.value.totalProducts = data.total
        productData.value = data
      }
    } catch (err) {
      console.error(err)
    } finally {
      loadingStates.value.productList = false
    }
  }

  async function fetchProductDetail(id: string): Promise<void> {
    try {
      const additionalFields = ",images,brand,warrantyInformation,shippingInformation"

      loadingStates.value.productDetail = true

      const data = await $fetch<
        ProductDetailType
      >(`${baseApi}/products/${id}?select=${productFieldNames + additionalFields}`)

      productDetail.value = data
    } catch (err) {
      console.error(err)
    } finally {
      loadingStates.value.productDetail = false
    }
  }

  return {
    loadingStates,
    productData,
    categories,
    productDetail,
    filter,
    fetchCategories,
    fetchProducts,
    fetchProductDetail
  }
})
