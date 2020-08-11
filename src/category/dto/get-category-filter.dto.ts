import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetCaegoryFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
  
}
