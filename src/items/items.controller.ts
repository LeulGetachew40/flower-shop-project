import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemCreateDto } from './dto/item.create.dto';
import { ItemUpdateDto } from './dto/item.update.dto';
import {
  AuthGuard,
  Roles,
} from './../common/guards/authGuard.authorzation.guards';
import { ProtectRoute } from './../common/guards/protectRoute.authorization.guards';
import { Role } from './../auth/role.enum';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createItemDto: ItemCreateDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    // create pagination functionality here
    return this.itemsService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Roles([Role.ADMIN, Role.CUSTOMER])
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
