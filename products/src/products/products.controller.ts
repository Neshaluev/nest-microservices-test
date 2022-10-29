import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy,
    private readonly productsService: ProductsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('create')
  create(@Body() createProductDto: ProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/category/:type')
  findByCategory(@Param('type') type: string) {
    console.log(`type category`, type);
    return this.productsService.findByType(type);
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/wishlist/:id')
  async putItemInWishlist(
    @Param('id') productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const product = await this.productsService.findOneById(productId);
    const payload = {
      event: 'ADD_TO_WISHLIST',
      data: { userId, product, qty: 1 },
    };

    this.client.emit('EVENT_WISHLIST', payload);

    return product;
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/wishlist/:id')
  async deleteItemInWishlist(
    @Param() productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const product = await this.productsService.findOneById(productId);
    const payload = {
      event: 'REMOVE_FROM_WISHLIST',
      data: { userId, product, qty: 1 },
    };

    this.client.emit('EVENT_CUSTOMER', payload);

    return product;
  }

  @UseGuards(AccessTokenGuard)
  @Put('/cart/:id')
  async addToCart(
    @Param() productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    //qty: req.body.qty
    //productId: req.body._id,
    const product = await this.productsService.findOneById(productId);

    const payload = {
      event: 'ADD_TO_CART',
      data: { userId, product, qty: 1 },
    };

    await firstValueFrom(this.client.emit('EVENT_CUSTOMER', payload));

    await firstValueFrom(this.client.emit('EVENT_ORDER', payload));

    return product;
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/cart/:id')
  async removeFromCart(
    @Param() productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const product = await this.productsService.findOneById(productId);
    const payload = {
      event: 'REMOVE_FROM_CART',
      data: { userId, product, qty: 1 },
    };

    this.client.emit('EVENT_CUSTOMER', payload);

    return product;
  }
}
