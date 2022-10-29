import {NotFoundException} from "@nestjs/common"
import { FilterQuery, Model } from "mongoose";
import { IdentifiableEntitySchema } from "./IdentifiableEntittySchema";

export abstract class EntityRepository<
TSchema extends IdentifiableEntitySchema>{
    constructor(
        protected readonly entityModel: Model<TSchema>
    ){}

    protected async findOne(entityFilterQuery: FilterQuery<TSchema>): Promise<TSchema>{
        const entityDocument = await this.entityModel.findOne(
            entityFilterQuery
        )

        if(!entityDocument) {
            throw new NotFoundException('Entity was not found.')
        }

        return entityDocument
    }

    protected async find(
        entityFilterQuery?: FilterQuery<TSchema>
    ): Promise<TSchema[]>
    {
        return await this.entityModel.find(entityFilterQuery, {}, {lean: true})
    }

    protected async findOneAndReplace(
        entityFilterQuery: FilterQuery<TSchema>,
        entity: any,
    ){
        const updatedEntityDocument = await this.entityModel.findOneAndReplace(
            entityFilterQuery,
            entity,
            {
                new: true,
                useFindAndModify: false,
                lean: true,
            }
        )

        if (!updatedEntityDocument) {
            throw new NotFoundException('Unable to find the entity to replace.');
          }

        return updatedEntityDocument
    }
}