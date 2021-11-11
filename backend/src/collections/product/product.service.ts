import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductType } from './product.entity';
import { Repository, Like } from 'typeorm';
import { ProductTypeRequest, ProductRequest } from './product.interface';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
    ) { }

    async createProductType(productType: ProductTypeRequest, user: any): Promise<any> {
        try {
            const newProductType = this.productTypeRepository.create(productType);
            newProductType.createdBy = user.id;
            newProductType.lastUpdatedBy = user.id;
            const savedProductType = await this.productTypeRepository.save(newProductType);
            return savedProductType;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async createProduct(product: ProductRequest, user: any): Promise<any> {
        try {
            const newProduct = this.productRepository.create(product);
            newProduct.createdBy = user.id;
            newProduct.lastUpdatedBy = user.id;
            const savedProduct = await this.productRepository.save(newProduct);
            return savedProduct;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async updateProductType(id: number, productType: ProductTypeRequest, user: any): Promise<any> {
        try {
            const productTypeToUpdate = {
                lastUpdatedBy: user.id,
                ...productType
            };
            const updatedProductType = await this.productTypeRepository.update({ id: id }, productTypeToUpdate);
            if (updatedProductType?.affected === 1) {
                return this.productTypeRepository.findOne(id);
            } else {
                return { message: "No product type was updated! " };
            }
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async updateProduct(id: number, product: ProductRequest, user: any): Promise<any> {
        try {
            const productToUpdate = {
                lastUpdatedBy: user.id,
                ...product
            };
            const updatedProduct = await this.productRepository.update({ id: id }, productToUpdate);
            if (updatedProduct?.affected === 1) {
                return this.productRepository.findOne(id);
            } else {
                return { message: "No product was updated! " };
            }
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getAllProducts(query: any): Promise<Product[]> {
        try {
            if (Object.keys(query).length) {
                const name: string = Object.values(query)[0].toString();
                return await this.productRepository.find({
                    name: Like(`%${Buffer.from(name, 'base64').toString('ascii')}%`)
                });
            }
            return await this.productRepository.find();
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getProductById(id: string): Promise<Product> {
        try {
            return await this.productRepository.findOne(id);
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async getProductTypes(): Promise<ProductType[]> {
        try {
            return await this.productTypeRepository.find()
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }
}
