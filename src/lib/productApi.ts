import { Product } from "@/types/product";

// Fake Store API
const API_BASE_URL = "https://fakestoreapi.com";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createProduct(product: Product): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers like Authorization here
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}
