import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemCreateDto } from './dto/item.create.dto';
import { ItemUpdateDto } from './dto/item.update.dto';
import { AuthGuard } from '../common/guards/authGuard.authorzation.guards';
import { ProtectRoute } from './../common/guards/protectRoute.authorization.guards';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createItemDto: ItemCreateDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @UseGuards(AuthGuard)
  @SetMetadata('userType', ['ADMIN', 'CUSTOMER'])
  @UseGuards(ProtectRoute)
  @Get('/cart')
  viewCart() {
    return this.itemsService.viewCart();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateItemDto: ItemUpdateDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
