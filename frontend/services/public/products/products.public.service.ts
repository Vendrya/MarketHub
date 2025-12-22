import { publicHttp } from "@/services/http/public.client";
import { Product } from "./products.types";
import { ProductCategory } from "./products.types";

export const PublicProductsService = {
    getAll(): Promise<Product[]> {
        return publicHttp("/products");
    },

    getById(id: string): Promise<Product> {
        return publicHttp(`/products/${id}`);
    },

    getByCategory(category: ProductCategory): Promise<Product[]> {
        const params = new URLSearchParams({ category });
        return publicHttp(`/products/by-category?${params.toString()}`);
    },

    suggest(query: string, limit = 10): Promise<Product[]> {
        const params = new URLSearchParams({
            query,
            limit: String(limit),
        });

        return publicHttp(`/search/suggest?${params.toString()}`);
    }
};
