export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  }

export interface ProductGetRequest {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface ProductPutRequest {
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}