import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private repo: CategoryRepository
    ){}

    async store(
        createTaskDto: CreateCategoryDto,
      ): Promise<Category> {
        return this.repo.store(createTaskDto);
      }
}
