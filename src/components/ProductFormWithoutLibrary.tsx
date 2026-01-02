import { useState, ChangeEvent, FormEvent } from "react";
import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateProduct, ValidationErrors } from "@/lib/productValidation";
import { PRODUCT_CATEGORIES, Product, ProductFormData } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductFormWithoutLibraryProps {
  onSubmit: (product: Product) => void;
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: "",
  category: "",
  sku: "",
  stockQuantity: "",
  imageUrl: "",
};

export function ProductFormWithoutLibrary({
  onSubmit,
}: ProductFormWithoutLibraryProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
    setTouched((prev) => ({ ...prev, category: true }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate only the touched field
    const validationErrors = validateProduct(formData);
    if (validationErrors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors[field as keyof ValidationErrors],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validateProduct(formData);
    setErrors(validationErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Create product object
    const product: Product = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      sku: formData.sku.trim() || undefined,
      stockQuantity: parseInt(formData.stockQuantity),
      imageUrl: formData.imageUrl.trim() || undefined,
    };

    onSubmit(product);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setFormData(initialFormData);
      setErrors({});
      setTouched({});
      setIsSubmitted(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="form-section flex flex-col items-center justify-center py-12 animate-scale-in">
        <div className="success-badge mb-4">
          <Check className="h-5 w-5" />
          Product Created Successfully!
        </div>
        <p className="text-muted-foreground text-sm">
          The form will reset in a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <Package className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="form-title">Create Product</h2>
          <p className="form-description">Using native React state</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name-native">
            Product Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name-native"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            placeholder="Enter product name"
            className={cn(touched.name && errors.name && "input-error")}
          />
          {touched.name && errors.name && (
            <p className="error-message">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description-native">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description-native"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={() => handleBlur("description")}
            placeholder="Enter product description"
            className={cn(
              "min-h-[100px] resize-none",
              touched.description && errors.description && "input-error"
            )}
          />
          {touched.description && errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="price-native">
              Price ($) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price-native"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              onBlur={() => handleBlur("price")}
              placeholder="0.00"
              className={cn(touched.price && errors.price && "input-error")}
            />
            {touched.price && errors.price && (
              <p className="error-message">{errors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.category} onValueChange={handleSelectChange}>
              <SelectTrigger
                className={cn(
                  touched.category && errors.category && "input-error"
                )}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.category && errors.category && (
              <p className="error-message">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="sku-native">SKU</Label>
            <Input
              id="sku-native"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              onBlur={() => handleBlur("sku")}
              placeholder="e.g., PROD-001"
              className={cn(touched.sku && errors.sku && "input-error")}
            />
            {touched.sku && errors.sku && (
              <p className="error-message">{errors.sku}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stockQuantity-native">
              Stock Quantity <span className="text-destructive">*</span>
            </Label>
            <Input
              id="stockQuantity-native"
              name="stockQuantity"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              onBlur={() => handleBlur("stockQuantity")}
              placeholder="0"
              className={cn(
                touched.stockQuantity && errors.stockQuantity && "input-error"
              )}
            />
            {touched.stockQuantity && errors.stockQuantity && (
              <p className="error-message">{errors.stockQuantity}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl-native">Image URL</Label>
          <Input
            id="imageUrl-native"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={() => handleBlur("imageUrl")}
            placeholder="https://example.com/image.jpg"
            className={cn(touched.imageUrl && errors.imageUrl && "input-error")}
          />
          {touched.imageUrl && errors.imageUrl && (
            <p className="error-message">{errors.imageUrl}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Create Product
        </Button>
      </form>
    </div>
  );
}
