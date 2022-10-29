import { Injectable } from '@nestjs/common';
import { ProductFactory } from './db/products-model.factory';
import { ProductsRepository } from './db/products.repository';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productFactory: ProductFactory
  ){}

  async create(ProductDto: ProductDto) {
    const result = await this.productFactory.create(
       ProductDto.name,
       ProductDto.desc,
       ProductDto.banner,
       ProductDto.type,
       ProductDto.unit,
       ProductDto.price,
       ProductDto.available,
       ProductDto.suplier,
    )

    return result;
  }

  async findOneById(id: string) {
    const result = await this.productsRepository.findOneById(id);

    return result;
  }

  async findByType(type: string){
    const result = await this.productsRepository.findByOne(type);

    return result
  }


  async findAll() {
    const result = await this.productsRepository.findAll();

    return result;
  }


  update(id: number, updateProductDto: any) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
