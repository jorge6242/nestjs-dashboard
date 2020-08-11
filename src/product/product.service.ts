import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private repo: ProductRepository,
  ) {}

  async index(
    filterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    return this.repo.index(filterDto);
  }

  async get(id: number): Promise<Product> {
    const found = await this.repo.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }

  async store(createProductDto: CreateProductDto): Promise<Product> {
    const { description } = createProductDto;
    const found = await this.repo.findOne({ where: { description } });
    if (found) {
      throw new NotFoundException(`The register ${description} already exist`);
    }
    return this.repo.store(createProductDto);
  }

  async update(
    id: number,
    body: CreateProductDto,
  ): Promise<Product> {
    const { description, title } = body;
    const product = await this.get(id);
    product.description = description;
    product.title = title;
    await product.save();
    return product;
  }

  async delete(
    id: number,
  ): Promise<void> {
    const result = await this.repo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }
}
