export interface ProductTypeRequest {
    name: string;
    description: string;
}

export interface ProductRequest {
    name: string
    description: string;
    pricePerUnit: number;
    minMassOrderQuantity: number;
    productType: string;
}

export interface StandardResponse {
    success: boolean;
    data: any;
    message: string;
}