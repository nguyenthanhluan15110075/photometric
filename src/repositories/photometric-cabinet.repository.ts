import {DefaultCrudRepository} from '@loopback/repository';
import {PhotometricCabinet, PhotometricCabinetRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhotometricCabinetRepository extends DefaultCrudRepository<
  PhotometricCabinet,
  typeof PhotometricCabinet.prototype._id,
  PhotometricCabinetRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(PhotometricCabinet, dataSource);
  }
}
