import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductFormWithLibrary } from "@/components/ProductFormWithLibrary";
import { ProductFormWithoutLibrary } from "@/components/ProductFormWithoutLibrary";
import { ProductDisplay } from "@/components/ProductDisplay";
import { Product } from "@/types/product";
import { Code, FileCode2 } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductCreate = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    console.log("Product created:", product);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Product Creation App
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A demonstration of form handling with and without a form library.
            Both implementations include proper validation based on API requirements.
          </p>
        </div>

        {/* Tabs for switching between form implementations */}
        <Tabs defaultValue="with-library" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="with-library" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              With Form Library
            </TabsTrigger>
            <TabsTrigger value="without-library" className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4" />
              Without Form Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="with-library">
            <ProductFormWithLibrary onSubmit={handleProductCreate} />
          </TabsContent>

          <TabsContent value="without-library">
            <ProductFormWithoutLibrary onSubmit={handleProductCreate} />
          </TabsContent>
        </Tabs>

        {/* Product Display */}
        <ProductDisplay products={products} />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            <strong>With Library:</strong> react-hook-form + zod for schema validation
          </p>
          <p className="mt-1">
            <strong>Without Library:</strong> useState + custom validation functions
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
