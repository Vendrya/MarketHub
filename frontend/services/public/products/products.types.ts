export interface Product {
    id: string;
    title: string;
    price: number;
}

export interface CreateProductDTO {
    title: string;
    description: string;
    category: ProductCategory;
    price: number;
}

export enum ProductCategory {
    ELECTRONICS = "electronics",
    FASHION = "fashion",
    HOME = "home",
    BEAUTY = "beauty",
    SPORTS = "sports",
    TOYS = "toys",
    AUTOMOTIVE = "automotive",
    BOOKS = "books",
    MUSIC = "music",
    GROCERY = "grocery",
    OTHER = "other"
}