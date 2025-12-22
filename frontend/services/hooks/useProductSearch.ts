"use client";

import { useState } from "react";
import { PublicProductsService } from "@/services/public/products/products.public.service";
import { Product } from "@/services/public/products/products.types";

export function useProductSearch(): {
    search: (query: string) => Promise<void>;
    results: Product[];
    loading: boolean;
    error: string | null;
} {
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (query: string) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const data = await PublicProductsService.searchByTag(query);
            setResults(data);
        } catch {
            setError("Failed to search products");
        } finally {
            setLoading(false);
        }
    };

    return { search, results, loading, error };
}
