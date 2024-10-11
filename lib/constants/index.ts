import type { FilterType } from "../types";

export const PRODUCT_FIELDS = [
  { name: "id", title: "id", public: false },
  { name: "title", title: "Title", public: true },
  { name: "price", title: "Price", public: true },
  { name: "description", title: "Description", public: false },
  { name: "reviews", title: "Reviews", public: false },
  { name: "category", title: "Category", public: true },
  { name: "thumbnail", title: "Thumbnail", public: false },
  { name: "availabilityStatus", title: "Availability", public: false },
  { name: "rating", title: "Rating", public: true },
  { name: "discountPercentage", title: "Discount", public: true }
]

export const FILTER_ORDER: { title: string; value: FilterType["order"] }[] = [
  { title: "A - Z", value: "asc" },
  { title: "Z - A", value: "desc" }
]
