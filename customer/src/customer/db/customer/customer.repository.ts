import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDto } from '../../dto/customer.dto';
import { CustomerSchema } from './customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(CustomerSchema.name)
    private readonly registerModel: Model<CustomerSchema>,
  ) {}

  async create(custoemrData: CustomerDto) {
    return this.registerModel.create(custoemrData);
  }
  async findByOne(searchData: any) {
    return this.registerModel.findOne(searchData);
  }
  async update(id: string, authUserData: any) {
    return this.registerModel.updateOne(
      { _id: id },
      { $set: authUserData },
      { upsert: true },
    );
  }
  async findOneById(id: string) {
    return this.registerModel.findOne({ _id: id });
  }
}
