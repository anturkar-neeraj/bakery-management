import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductType } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductTypeRequest, CreateProductRequest } from './product.interface';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
    ) { }

    async createProductType(productType: CreateProductTypeRequest, user: any): Promise<any> {
        const newProductType = this.productTypeRepository.create(productType);
        newProductType.createdBy = user.id;
        newProductType.lastUpdatedBy = user.id;
        const savedProductType = await this.productTypeRepository.save(newProductType);
        return savedProductType;
    }

    async createProduct(product: CreateProductRequest, user: any): Promise<any> {
        const newProduct = this.productRepository.create(product);
        newProduct.createdBy = user.id;
        newProduct.lastUpdatedBy = user.id;
        const savedProduct = await this.productRepository.save(newProduct);
        return savedProduct;
    }
}
