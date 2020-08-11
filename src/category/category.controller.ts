import { Controller, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(
        private service: CategoryService
    ){}

    @Post()
    store(
      @Body() createTaskDto: CreateCategoryDto,
    ): Promise<Category> {
      return this.service.store(createTaskDto);
    }
}
