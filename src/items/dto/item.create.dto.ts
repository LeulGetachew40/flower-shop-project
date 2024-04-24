import { Prisma } from '@prisma/client';
import { IsBoolean, IsInt, Min, Max, IsUUID } from 'class-validator';
export class ItemCreateDTO implements Partial<Prisma.ItemsCreateInput> {
  @IsUUID()
  itemID: string;

  @IsInt()
  @Min(50)
  @Max(500)
  stock: number;

  @IsBoolean()
  inStock: boolean;
}
// add more validation here
