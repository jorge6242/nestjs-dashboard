import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Category } from './category.entity';
import { GetCaegoryFilterDto } from './dto/get-category-filter.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

  async index(
    filterDto: GetCaegoryFilterDto,
  ): Promise<Category[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere('(category.title LIKE :search OR category.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const category = await query.getMany();
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async store(
    createTaskDto: CreateCategoryDto,
  ): Promise<Category> {
    const { title, description } = createTaskDto;

    const category = new Category();
    category.title = title;
    category.description = description;

    try {
      await category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return category;
  }
}
