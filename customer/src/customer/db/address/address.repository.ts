import {Injectable} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddressDto } from "src/customer/dto/address.dto";
import { AddressSchema } from "./address.schema";


@Injectable()
export class AddressRepository{
    constructor(
        @InjectModel(AddressSchema.name) 
        private readonly addressModel: Model<AddressSchema>
    ){}

    async create(addressDto: AddressDto){
        return this.addressModel.create(addressDto)
    }
    async findByOne(searchData: any){
        return this.addressModel.findOne(searchData)
    }
    async update(id: string, authUserData: any) {
        return this.addressModel.updateOne({_id: id}, {$set: authUserData }, { upsert: true })
    }
    async findOneById(id: string) {
        return this.addressModel.findOne({_id: id})
    }
}