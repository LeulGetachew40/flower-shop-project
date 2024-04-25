import { ItemCreateDto } from './item.create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ItemUpdateDto extends PartialType(ItemCreateDto) {}
