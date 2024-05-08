## how to implement pagination in nest js

To implement pagination in Nest.js, especially when using TypeORM, you can follow these steps, combining insights from the provided sources:

1. **Create a Pagination Model**: This model will represent the metadata for pagination, including the current page, the number of items per page (`take`), the total number of items (`itemCount`), the total number of pages (`pageCount`), and flags indicating whether there are previous or next pages.

   ```typescript
   import { ApiProperty } from '@nestjs/swagger';
   import { PageMetaDtoParameters } from '../interfaces';

   export class PageMetaDto {
     @ApiProperty()
     readonly page: number;

     @ApiProperty()
     readonly take: number;

     @ApiProperty()
     readonly itemCount: number;

     @ApiProperty()
     readonly pageCount: number;

     @ApiProperty()
     readonly hasPreviousPage: boolean;

     @ApiProperty()
     readonly hasNextPage: boolean;

     constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
       this.page = pageOptionsDto.page;
       this.take = pageOptionsDto.take;
       this.itemCount = itemCount;
       this.pageCount = Math.ceil(this.itemCount / this.take);
       this.hasPreviousPage = this.page > 1;
       this.hasNextPage = this.page < this.pageCount;
     }
   }
   ```

2. **Create a DTO for Pagination Options**: This DTO will handle the parameters for pagination, such as the page number, the number of items per page, and the sorting order.

   ```typescript
   import { ApiPropertyOptional } from '@nestjs/swagger';
   import { Type } from 'class-transformer';
   import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
   import { Order } from '../constants';

   export class PageOptionsDto {
     @ApiPropertyOptional({ enum: Order, default: Order.ASC })
     @IsEnum(Order)
     @IsOptional()
     readonly order?: Order = Order.ASC;

     @ApiPropertyOptional({
       minimum: 1,
       default: 1,
     })
     @Type(() => Number)
     @IsInt()
     @Min(1)
     @IsOptional()
     readonly page?: number = 1;

     @ApiPropertyOptional({
       minimum: 1,
       maximum: 50,
       default: 10,
     })
     @Type(() => Number)
     @IsInt()
     @Min(1)
     @Max(50)
     @IsOptional()
     readonly take?: number = 10;

     get skip(): number {
       return (this.page - 1) * this.take;
     }
   }
   ```

3. **Implement Pagination in Your Service**: Use the `PageOptionsDto` to fetch paginated data from your repository. You can use TypeORM's `findAndCount` method to efficiently fetch the data along with the total count, which is useful for calculating pagination metadata.

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { YourEntity } from './your-entity.entity';
   import { PageMetaDto, PageOptionsDto } from './dto';

   @Injectable()
   export class YourEntityService {
     constructor(
       @InjectRepository(YourEntity)
       private yourEntityRepository: Repository<YourEntity>,
     ) {}

     async findAll(
       pageOptionsDto: PageOptionsDto,
     ): Promise<{ data: YourEntity[]; meta: PageMetaDto }> {
       const [entities, total] = await this.yourEntityRepository.findAndCount({
         take: pageOptionsDto.take,
         skip: pageOptionsDto.skip,
       });

       const meta: PageMetaDto = {
         page: pageOptionsDto.page,
         take: pageOptionsDto.take,
         itemCount: total,
         pageCount: Math.ceil(total / pageOptionsDto.take),
         hasPreviousPage: pageOptionsDto.page > 1,
         hasNextPage:
           pageOptionsDto.page < Math.ceil(total / pageOptionsDto.take),
       };

       return { data: entities, meta };
     }
   }
   ```

4. **Use the Service in Your Controller**: Finally, use the service in your controller to handle the pagination logic.

   ```typescript
   import { Controller, Get, Query } from '@nestjs/common';
   import { YourEntityService } from './your-entity.service';
   import { PageOptionsDto } from './dto';

   @Controller('your-entity')
   export class YourEntityController {
     constructor(private readonly yourEntityService: YourEntityService) {}

     @Get()
     findAll(@Query() pageOptionsDto: PageOptionsDto) {
       return this.yourEntityService.findAll(pageOptionsDto);
     }
   }
   ```

This approach allows you to implement pagination in a clean and reusable manner, leveraging Nest.js's modular architecture and TypeORM's powerful querying capabilities.
