import { Body, Controller, Get, Post, UseGuards, Request, Put, Param } from "@nestjs/common";
import { ProductService } from './product.service';
import { ProductRequest, ProductTypeRequest } from './product.interface';
import { JwtAuthGuard } from "../user/auth/jwt-auth.guard";


@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post('productType')
    createProductType(@Body() productType: ProductTypeRequest, @Request() request: any) {
        return this.productService.createProductType(productType, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('product')
    createProduct(@Body() product: ProductRequest, @Request() request: any) {
        return this.productService.createProduct(product, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('productType/:id')
    updateProductType(@Param('id') id: number, @Body() productType: ProductTypeRequest, @Request() request: any) {
        return this.productService.updateProductType(id, productType, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('product/:id')
    updateProduct(@Param('id') id: number, @Body() product: ProductRequest, @Request() request: any) {
        return this.productService.updateProduct(id, product, request.user);
    }

}