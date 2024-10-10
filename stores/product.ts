import { PRODUCT_FIELDS } from "~/lib/constants"
import type { ProductCategoryType, ProductDataResponse, ProductDetailType } from "~/lib/types"

export const useProductStore = defineStore("product", () => {
  const { public: { baseApi } } = useRuntimeConfig()

  const productDetail = ref<ProductDetailType | null>(null)
  const productData = ref<ProductDataResponse | null>(null)
  const categories = ref<ProductCategoryType[] | null>([])

  const productFieldNames = PRODUCT_FIELDS.map(f => f.name).join(",")

  async function fetchCategories(): Promise<void> {
    const { data } = await useFetch<
      ProductCategoryType[]
    >(`${baseApi}/products/categories?limit=5`)

    categories.value = data.value ? data.value.slice(0, 5) : []
  }

  async function fetchProducts({ category, sortBy, limit }: {
    category?: string;
    sortBy?: { field: string; order: "asc" | "desc" };
    limit?: number;
  }): Promise<void> {
    let path = `${baseApi}/products`
    let queryParams = [`select=${productFieldNames}`]

    if (category && category !== "all") path += `/category/${category}`
    if (limit) queryParams.push(`limit=${limit}`)
    if (sortBy) queryParams.push(`sortBy=${sortBy.field}&order=${sortBy.order}`)
    if (queryParams.length) path += `?${queryParams.join("&")}`

    const { data } = await useFetch<ProductDataResponse>(path)

    productData.value = data.value
  }

  async function fetchProductDetail(id: string): Promise<void> {
    const additionalFields = ",images,brand,warrantyInformation,shippingInformation"

    const { data } = await useFetch<
      ProductDetailType
    >(`${baseApi}/products/${id}?select=${productFieldNames + additionalFields}`)

    productDetail.value = data.value
  }

  return {
    productData,
    categories,
    productDetail,
    fetchCategories,
    fetchProducts,
    fetchProductDetail
  }
})
