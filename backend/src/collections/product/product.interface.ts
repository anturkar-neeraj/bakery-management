export interface CreateProductTypeRequest {
    name: string;
    description: string;
}

export interface CreateProductRequest {
    name: string
    description: string;
    pricePerUnit: number;
    minMassOrderQuantity: number;
    productType: string;
}