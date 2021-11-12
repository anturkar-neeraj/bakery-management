import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductType } from './product.entity';
import { Repository, Like } from 'typeorm';
import { ProductTypeRequest, ProductRequest, StandardResponse } from './product.interface';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
    ) { }

    async createProductType(productType: ProductTypeRequest, user: any): Promise<StandardResponse> {
        try {
            const newProductType = this.productTypeRepository.create(productType);
            newProductType.createdBy = user.id;
            newProductType.lastUpdatedBy = user.id;
            const savedProductType = await this.productTypeRepository.save(newProductType);
            let createProductTypeRespone: StandardResponse;
            createProductTypeRespone.success = true;
            createProductTypeRespone.data = savedProductType;
            createProductTypeRespone.message = "Product type created successfully."
            return createProductTypeRespone;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async createProduct(product: ProductRequest, user: any): Promise<StandardResponse> {
        try {
            const newProduct = this.productRepository.create(product);
            newProduct.createdBy = user.id;
            newProduct.lastUpdatedBy = user.id;
            const savedProduct = await this.productRepository.save(newProduct);
            let createProductRespone: StandardResponse;
            createProductRespone.success = true;
            createProductRespone.data = savedProduct;
            createProductRespone.message = "Product created successfully."
            return createProductRespone;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async updateProductType(id: number, productType: ProductTypeRequest, user: any): Promise<StandardResponse> {
        try {
            const productTypeToUpdate = {
                lastUpdatedBy: user.id,
                ...productType
            };
            const updatedProductType = await this.productTypeRepository.update({ id: id }, productTypeToUpdate);
            let updateProductTypeRespone: StandardResponse;
            if (updatedProductType?.affected === 1) {
                updateProductTypeRespone.success = true;
                updateProductTypeRespone.data = await this.productTypeRepository.findOne(id);
                updateProductTypeRespone.message = "Product updated successfully."
            } else {
                updateProductTypeRespone.success = false;
                updateProductTypeRespone.message = "No product type was updated."
            }
            return updateProductTypeRespone;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async updateProduct(id: number, product: ProductRequest, user: any): Promise<StandardResponse> {
        try {
            const productToUpdate = {
                lastUpdatedBy: user.id,
                ...product
            };
            const updatedProduct = await this.productRepository.update({ id: id }, productToUpdate);
            let updateProductResponse: StandardResponse;
            if (updatedProduct?.affected === 1) {
                updateProductResponse.success = true;
                updateProductResponse.data = await this.productRepository.findOne({ where: { id: id }, relations: ["productType"] });
                updateProductResponse.message = "Product updated successfully."
            } else {
                updateProductResponse.success = false;
                updateProductResponse.message = 'No product was updated';
            }
            return updateProductResponse;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getAllProducts(query: any): Promise<StandardResponse> {
        try {
            let products: Product[];
            let getAllProductsResponse: StandardResponse;
            if (Object.keys(query).length) {
                const name: string = Object.values(query)[0].toString();
                products = await this.productRepository.find({
                    where: { name: Like(`%${Buffer.from(name, 'base64').toString('ascii')}%`) },
                    relations: ["productType"]
                });

            }
            products = await this.productRepository.find({
                relations: ["productType"]
            });
            if (products.length) {
                getAllProductsResponse.success = true;
                getAllProductsResponse.data = products;
                getAllProductsResponse.message = "Products fetched successfully."
            } else {
                getAllProductsResponse.success = true;
                getAllProductsResponse.message = "No products fetched."
            }
            return getAllProductsResponse;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getProductById(id: string): Promise<StandardResponse> {
        try {
            let product: Product;
            let getProductByIdResponse: StandardResponse;
            product = await this.productRepository.findOne(id);
            if (product) {
                getProductByIdResponse.success = true;
                getProductByIdResponse.data = product;
                getProductByIdResponse.message = "Product Fetched successfully."
            } else {
                getProductByIdResponse.success = false;
                getProductByIdResponse.message = "No product found."
            }
            return getProductByIdResponse;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getProductTypes(): Promise<StandardResponse> {
        try {
            let productTypes: ProductType[];
            let getProductTypeResponse: StandardResponse;
            productTypes = await this.productTypeRepository.find()
            if (productTypes.length) {
                getProductTypeResponse.success = true;
                getProductTypeResponse.data = productTypes;
                getProductTypeResponse.message = "Product types fetched successfully."
            } else {
                getProductTypeResponse.success = false;
                getProductTypeResponse.message = "No product types fetched."
            }
            return getProductTypeResponse;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }
}
