import { protectedHttp } from "@/services/http/protected.client";
import { CreateProductDTO, Product } from "../../public/products/products.types";

export const ProtectedProductsService = {
    create(payload: CreateProductDTO): Promise<Product> {
        return protectedHttp("/products", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    delete(id: string): Promise<void> {
        return protectedHttp(`/products/${id}`, {
            method: "DELETE",
        });
    },
};
