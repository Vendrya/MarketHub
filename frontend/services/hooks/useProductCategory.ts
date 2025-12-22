"use client";

import { useState } from "react";
import { PublicProductsService } from "@/services/public/products/products.public.service";
import { Product, ProductCategory } from "@/services/public/products/products.types";

export function useProductCategory(): {
    search: (category: ProductCategory) => Promise<void>;
    results: Product[];
    loading: boolean;
    error: string | null;
} {
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (category: ProductCategory) => {
        if (!category.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const data = await PublicProductsService.getByCategory(category);
            setResults(data);
        } catch {
            setError("Failed to search products");
        } finally {
            setLoading(false);
        }
    };

    return { search, results, loading, error };
}
