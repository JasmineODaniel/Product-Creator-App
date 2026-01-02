export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  sku?: string;
  stockQuantity: number;
  imageUrl?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  sku: string;
  stockQuantity: string;
  imageUrl: string;
}

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Health & Beauty",
  "Food & Beverages",
] as const;
