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
import {CREATE_PHOTOMETRIC_BODY, UPDATE_A_PHOTOMETRIC_BODY} from './open-apis';

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
    const existedName = await this.photometricCabinetRepository.findOne({
      where: {
        name: photometricCabinet.name,
      },
    });
    if (existedName) {
      console.error('Already have photometric cabinet', existedName.name);
      throw new Error('Already have photometric cabinet');
      // return null;
    }
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
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhotometricCabinet, {partial: true}),
        },
      },
    })
    photometricCabinet: PhotometricCabinet,
    @param.where(PhotometricCabinet) where?: Where<PhotometricCabinet>,
  ): Promise<Count> {
    return this.photometricCabinetRepository.updateAll(
      photometricCabinet,
      where,
    );
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

    if (photometricCabinet.name) {
      const existedName = await this.photometricCabinetRepository.findOne({
        where: {name: photometricCabinet.name},
      });

      if (existedName) {
        console.error('Already have photometric cabinet', existedName.name);
        throw new Error('Already have photometric cabinet');
        // return null;
      }
    }

    photometricCabinet.updatedAt = new Date().getTime();

    await this.photometricCabinetRepository.updateById(_id, photometricCabinet);

    return this.photometricCabinetRepository.findById(_id);
  }

  @put('/photometric-cabinets/{id}', {
    responses: {
      '204': {
        description: 'PhotometricCabinet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() photometricCabinet: PhotometricCabinet,
  ): Promise<void> {
    console.log('Replace content', photometricCabinet);
    await this.photometricCabinetRepository.replaceById(id, photometricCabinet);
  }

  @del('/photometric-cabinets/{id}', {
    responses: {
      '204': {
        description: 'PhotometricCabinet DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.photometricCabinetRepository.deleteById(id);
  }
}
