import { Controller, Post, Body, Get, Param, ParseIntPipe, Query, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@Controller('product')
export class ProductController {
    constructor(
        private service: ProductService
    ){}

    @Get()
    index(
      @Query(ValidationPipe) filterDto: GetProductFilterDto,
    ): Promise<Product[]> {
      return this.service.index(filterDto);
    }

    @Get('/:id')
    getTaskById(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Product> {
      return this.service.get(id);
    }

    @Post()
    store(
      @Body() createProductkDto: CreateProductDto,
    ): Promise<Product> {
      return this.service.store(createProductkDto);
    }

    @Patch('/:id')
    updateTaskStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: CreateProductDto,
    ): Promise<Product> {
      return this.service.update(id, body);
    }

    @Delete('/:id')
    delete(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
      return this.service.delete(id);
    }
}
