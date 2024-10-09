export type ProductCategoryType = {
  slug: string;
  name: string;
  url: string;
}

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  availabilityStatus: string;
  discountPercentage: string;
  rating: number;
  reviews: any[];
}

export type ProductPagination = {
  total: number;
  skip: number;
  limit?: number;
}

export type ProductDataResponse = {
  products: ProductType[];
} & ProductPagination
