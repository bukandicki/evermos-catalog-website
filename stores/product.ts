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

  const loadingStates = ref<Map<string, boolean>>(new Map)
  const productDetail = ref<ProductDetailType | null>(null)
  const productData = ref<ProductDataResponse | null>(null)
  const filter = ref<FilterType>({
    category: "all",
    limit: 12,
    skip: 0,
    totalProducts: undefined,
    sortBy: "discountPercentage",
    order: "desc"
  })
  const categories = ref<ProductCategoryType[] | null>([])

  const productFieldNames = PRODUCT_FIELDS.map(f => f.name).join(",")

  async function fetchCategories(): Promise<void> {
    loadingStates.value.set("product_categories", true)

    const { data } = await useFetch<
      ProductCategoryType[]
    >(`${baseApi}/products/categories?limit=5`)

    categories.value = data.value ? data.value.slice(0, 5) : []

    loadingStates.value.set("product_categories", false)
  }

  async function fetchProducts(): Promise<void> {
    let path = `${baseApi}/products`

    if (filter.value.category && filter.value.category !== "all") path += `/category/${filter.value.category}`

    loadingStates.value.set("product_lists", true)

    const { data } = await useFetch<ProductDataResponse>(path, {
      query: {
        limit: filter.value.limit,
        skip: filter.value.skip,
        sortBy: filter.value.sortBy,
        order: filter.value.order,
      }
    })

    if (productData.value && filter.value.skip) {
      productData.value.products = [
        ...productData.value.products,
        ...data.value?.products as ProductType[]
      ]
    }
    else {
      filter.value.totalProducts = data.value?.total
      productData.value = data.value
    }

    loadingStates.value.set("product_lists", false)
  }

  async function fetchProductDetail(id: string): Promise<void> {
    const additionalFields = ",images,brand,warrantyInformation,shippingInformation"

    loadingStates.value.set("product_detail", true)

    const { data } = await useFetch<
      ProductDetailType
    >(`${baseApi}/products/${id}?select=${productFieldNames + additionalFields}`)

    productDetail.value = data.value

    loadingStates.value.set("product_detail", false)
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
