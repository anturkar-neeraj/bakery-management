import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductRequest, CreateProductTypeRequest } from './product.interface';
import { JwtAuthGuard } from "../user/auth/jwt-auth.guard";


@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post('productType')
    createProductType(@Body() productType: CreateProductTypeRequest, @Request() req: any) {
        return this.productService.createProductType(productType, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('product')
    createProduct(@Body() product: CreateProductRequest, @Request() req: any) {
        return this.productService.createProduct(product, req.user);
    }

}