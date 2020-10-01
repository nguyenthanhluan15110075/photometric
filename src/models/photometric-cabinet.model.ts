import {Entity, model, property} from '@loopback/repository';

export interface Attributes {
  firmware?: string;
  hardware?: string;
}

@model({
  name: 'PhotometricCabinet',
  settings: {
    strictObjectIDCoercion: true,
  },
})
export class PhotometricCabinet extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {
      dataType: 'ObjectID', // or perhaps 'objectid'?
    },
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  description?: string;

  @property({
    type: 'object',
    required: false,
  })
  attributes?: object;

  @property({
    type: 'number',
    default: (new Date()).getTime(),
  })
  createdAt?: number;

  @property({
    type: 'number',
    default: (new Date()).getTime(),
  })
  updatedAt?:number;

  constructor(data?: Partial<PhotometricCabinet>) {
    super(data);
  }
}

export interface PhotometricCabinetRelations {
  // describe navigational properties here
}

// export type PhotometricCabinetWithRelations = PhotometricCabinet & PhotometricCabinetRelations;
