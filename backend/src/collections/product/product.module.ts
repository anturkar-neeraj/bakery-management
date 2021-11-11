import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { Product, ProductType } from "./product.entity";
import { ProductService } from "./product.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductType])],
    controllers: [ProductController],
    providers: [ProductService]
})

export class ProductModule { }
