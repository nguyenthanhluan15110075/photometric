import {
  Filter,
  FilterExcludingWhere,
  repository,
  Count,
  CountSchema,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  put,
  del,
  requestBody,
  patch,
} from '@loopback/rest';
import {PhotometricCabinet} from '../models';
import {PhotometricCabinetRepository} from '../repositories';
import {
  CREATE_PHOTOMETRIC_BODY,
  UPDATE_A_PHOTOMETRIC_BODY,
  UPDATE_ALL_PHOTOMETRIC_BODY,
} from './open-apis';

// Testing through Swagger on: http://localhost:3000/explorer

export class PhotometricCabinetController {
  constructor(
    @repository(PhotometricCabinetRepository)
    public photometricCabinetRepository: PhotometricCabinetRepository,
  ) {}

  @post('/photometric-cabinets', {
    responses: {
      '200': {
        description: 'PhotometricCabinet model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PhotometricCabinet)},
        },
      },
    },
  })
  async create(
    @requestBody(CREATE_PHOTOMETRIC_BODY)
    photometricCabinet: Omit<PhotometricCabinet, '_id'>,
  ): Promise<PhotometricCabinet> {
    // const existedName = await this.photometricCabinetRepository.findOne({
    //   where: {
    //     name: photometricCabinet.name,
    //   },
    // });
    // if (existedName) {
    //   console.error('Already have photometric cabinet', existedName.name);
    //   throw new Error('Already have photometric cabinet');
    //   // return null;
    // }
    return this.photometricCabinetRepository.create(photometricCabinet);
  }

  @get('/photometric-cabinets', {
    responses: {
      '200': {
        description: 'Array of PhotometricCabinet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PhotometricCabinet, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PhotometricCabinet) filter?: Filter<PhotometricCabinet>,
  ): Promise<PhotometricCabinet[]> {
    console.log('Watch the filter', filter);
    return this.photometricCabinetRepository.find(filter);
  }

  @patch('/photometric-cabinets', {
    responses: {
      '200': {
        description: 'PhotometricCabinet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody(UPDATE_ALL_PHOTOMETRIC_BODY)
    photometricCabinet: PhotometricCabinet,
    @param.where(PhotometricCabinet) where?: Where<PhotometricCabinet>,
  ): Promise<Count> {
    photometricCabinet.updatedAt = new Date().getTime();
    const result = await this.photometricCabinetRepository.updateAll(
      photometricCabinet,
      where,
    );
    console.log(result);
    return result;
  }

  @get('/photometric-cabinets/{id}', {
    responses: {
      '200': {
        description: 'PhotometricCabinet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PhotometricCabinet, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') _id: string,
    @param.filter(PhotometricCabinet, {exclude: 'where'})
    filter?: FilterExcludingWhere<PhotometricCabinet>,
  ): Promise<PhotometricCabinet> {
    console.log('Get the photometric cabinet', _id);
    return this.photometricCabinetRepository.findById(_id, filter);
  }

  @patch('/photometric-cabinets/{id}', {
    responses: {
      '204': {
        description: 'PhotometricCabinet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') _id: string,
    @requestBody(UPDATE_A_PHOTOMETRIC_BODY)
    photometricCabinet: PhotometricCabinet,
  ): Promise<PhotometricCabinet> {
    console.log(photometricCabinet);

    // if (photometricCabinet.name) {
    //   const existedName = await this.photometricCabinetRepository.findOne({
    //     where: {name: photometricCabinet.name},
    //   });

    //   if (existedName) {
    //     console.error('Already have photometric cabinet', existedName.name);
    //     throw new Error('Already have photometric cabinet');
    //     // return null;
    //   }
    // }
    const isExisted = await this.photometricCabinetRepository.findById(_id);
    if (isExisted.isDeleted === true || !isExisted) {
      throw new Error('Not have photometric cabinet');
    }

    photometricCabinet.updatedAt = new Date().getTime();

    await this.photometricCabinetRepository.updateById(_id, photometricCabinet);

    return this.photometricCabinetRepository.findById(_id);
  }

  // @put('/photometric-cabinets/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'PhotometricCabinet UPDATE success',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             title: 'UpdatePhotometricCabibnetDataResponse',
  //             properties: {
  //               success: 'boolean',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') _id: string,
  //   @requestBody() photometricCabinet: PhotometricCabinet,
  // ): Promise<object> {
  //   console.log('Replace content', photometricCabinet);
  //   const isExisted = await this.photometricCabinetRepository.findById(_id);
  //   if (isExisted.isDeleted === true || !isExisted) {
  //     throw new Error('Not have photometric cabinet');
  //   }

  //   await this.photometricCabinetRepository.replaceById(
  //     _id,
  //     photometricCabinet,
  //   );
  //   return {success: true};
  // }

  @del('/photometric-cabinets/{id}', {
    responses: {
      '204': {
        description: 'PhotometricCabinet DELETE success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'DeletePhotometricCabibnetDataResponse',
              properties: {
                success: 'boolean',
              },
            },
          },
        },
      },
    },
  })
  async deleteById(@param.path.string('id') _id: string): Promise<object> {
    const isExisted = await this.photometricCabinetRepository.findById(_id);
    if (isExisted.isDeleted === true || !isExisted) {
      throw new Error('Not have photometric cabinet');
    }
    await this.photometricCabinetRepository.updateById(_id, {
      isDeleted: true,
    });
    return {success: true};
  }
}
