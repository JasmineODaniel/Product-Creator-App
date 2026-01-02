import { Package, DollarSign, Hash, Layers, Tag, Image } from "lucide-react";
import { Product } from "@/types/product";

interface ProductDisplayProps {
  products: Product[];
}

export function ProductDisplay({ products }: ProductDisplayProps) {
  if (products.length === 0) {
    return (
      <div className="form-section text-center py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Products Yet</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Create a product using either form above to see it displayed here.
        </p>
      </div>
    );
  }

  return (
    <div className="form-section">
      <h2 className="form-title mb-4">Created Products</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 bg-secondary/30 animate-fade-in"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg text-foreground">
                {product.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-primary font-bold">
                <DollarSign className="h-4 w-4" />
                {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>{product.category}</span>
              </div>

              {product.sku && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span>{product.sku}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>{product.stockQuantity} in stock</span>
              </div>

              {product.imageUrl && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Image className="h-4 w-4" />
                  <span className="truncate">Has image</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
