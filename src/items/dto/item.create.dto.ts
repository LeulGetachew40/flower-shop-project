import { IsBoolean, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
export class ItemCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(50)
  @Max(500)
  stock: number;

  @IsBoolean()
  inStock: boolean;

  @IsNotEmpty()
  itemSlug: string;
}
// add more validation here
