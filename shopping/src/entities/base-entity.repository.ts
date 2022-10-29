import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
 
import { EntityRepository } from './entity-repository';
import { IdentifiableEntitySchema } from './identifiable-entitty-schema';

export abstract class  BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findByOne(type: string){
    return this.findOne({type: type} as FilterQuery<TSchema>)
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}