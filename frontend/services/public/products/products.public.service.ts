import { publicHttp } from "@/services/http/public.client";
import { Product } from "./products.types";

export const PublicProductsService = {
    getAll(): Promise<Product[]> {
        return publicHttp("/products");
    },

    getById(id: string): Promise<Product> {
        return publicHttp(`/products/${id}`);
    },

    searchByTag(query: string): Promise<Product[]> {
        const params = new URLSearchParams({ query });
        return publicHttp(`/get-tagged-products?${params.toString()}`);
    },
};
