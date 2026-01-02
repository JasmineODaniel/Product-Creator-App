import { z } from "zod";

// Zod schema for form library version
export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Price must be a positive number",
    }),
  category: z.string().min(1, "Category is required"),
  sku: z
    .string()
    .max(50, "SKU must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  stockQuantity: z
    .string()
    .min(1, "Stock quantity is required")
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Stock quantity must be a non-negative integer",
    }),
  imageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProductFormSchema = z.infer<typeof productSchema>;

// Manual validation for no-library version
export interface ValidationErrors {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  sku?: string;
  stockQuantity?: string;
  imageUrl?: string;
}

export function validateProduct(data: {
  name: string;
  description: string;
  price: string;
  category: string;
  sku: string;
  stockQuantity: string;
  imageUrl: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Product name is required";
  } else if (data.name.length > 100) {
    errors.name = "Product name must be less than 100 characters";
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.length > 1000) {
    errors.description = "Description must be less than 1000 characters";
  }

  // Price validation
  if (!data.price) {
    errors.price = "Price is required";
  } else {
    const priceNum = parseFloat(data.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a positive number";
    }
  }

  // Category validation
  if (!data.category) {
    errors.category = "Category is required";
  }

  // SKU validation (optional)
  if (data.sku && data.sku.length > 50) {
    errors.sku = "SKU must be less than 50 characters";
  }

  // Stock quantity validation
  if (!data.stockQuantity) {
    errors.stockQuantity = "Stock quantity is required";
  } else {
    const stockNum = parseInt(data.stockQuantity);
    if (isNaN(stockNum) || stockNum < 0) {
      errors.stockQuantity = "Stock quantity must be a non-negative integer";
    }
  }

  // Image URL validation (optional)
  if (data.imageUrl) {
    try {
      new URL(data.imageUrl);
    } catch {
      errors.imageUrl = "Please enter a valid URL";
    }
  }

  return errors;
}
