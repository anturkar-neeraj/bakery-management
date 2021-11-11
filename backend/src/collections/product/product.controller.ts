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
    @Post('products')
    createProduct(@Body() product: ProductRequest, @Request() request: any) {
        return this.productService.createProduct(product, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('productTypes/:id')
    updateProductType(@Param('id') id: number, @Body() productType: ProductTypeRequest, @Request() request: any) {
        return this.productService.updateProductType(id, productType, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('products/:id')
    updateProduct(@Param('id') id: number, @Body() product: ProductRequest, @Request() request: any) {
        return this.productService.updateProduct(id, product, request.user);
    }

    @Get('products')
    getAllProducts(@Request() request: any) {
        return this.productService.getAllProducts(request.query);
    }

    @Get('products/:id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }

    @Get('productTypes')
    getProductTypes() {
        return this.productService.getProductTypes();
    }

}