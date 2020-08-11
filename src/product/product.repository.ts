import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async index(
    filterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere('(product.title LIKE :search OR product.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const product = await query.getMany();
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async store(
    createTaskDto: CreateProductDto,
  ): Promise<Product> {
    const { title, description } = createTaskDto;

    const product = new Product();
    product.title = title;
    product.description = description;

    try {
      await product.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return product;
  }
}
