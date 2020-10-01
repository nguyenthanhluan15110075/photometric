import {Request, RestBindings, post} from '@loopback/rest';
import {inject} from '@loopback/core';
import {
  CREATE_PHOTOMETRIC_RESPONSE,
  CREATE_PHOTOMETRIC_BODY,
} from './open-apis';
import {
  CreatePhotometricCabinetInput,
  CreatePhotometricCabinetResponse,
} from './interfaces';
/**
 * A simple controller to bounce back http requests
 */
export class PhotometricTestController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `POST /`
  @post('/', {
    requestBody: CREATE_PHOTOMETRIC_BODY,
    responses: {
      '200': CREATE_PHOTOMETRIC_RESPONSE,
    },
  })
  async createPhotometricCabinet(
    input: CreatePhotometricCabinetInput,
  ): Promise<CreatePhotometricCabinetResponse> {
    console.log('Input: ', input);
    const result: CreatePhotometricCabinetResponse = {
      _id: '123456',
      name: input.name,
      description: input.description,
      attributes: input.attributes
    }
    return result;
  }
}
