import {ResponseObject, RequestBodyObject} from '@loopback/rest';

/**
 * Create Photometric Result
 */
export const CREATE_PHOTOMETRIC_RESPONSE: ResponseObject = {
  description: 'Create a new photometric cabinet response',
  content: {
    'application/json': {
      // Structre response on swagger docs
      schema: {
        type: 'object',
        title: 'CreateNewPhotometricCabibnetResponse',
        properties: {
          _id: {type: 'string'},
          name: {type: 'string'},
          description: {type: 'string'},
          attributes: {
            type: 'object',
            properties: {
              firmware: {type: 'string'},
              hardware: {type: 'string'},
            },
          },
        },
      },
    },
  },
};

export const CREATE_PHOTOMETRIC_BODY: RequestBodyObject = {
  description: 'Create a new photometric cabinet input data',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'CreateNewPhotometricCabibnetDataInput',
        properties: {
          name: {type: 'string'},
          description: {type: 'string'},
          attributes: {
            type: 'object',
            properties: {
              firmware: {type: 'string'},
              hardware: {type: 'string'},
            },
          },
        },
        required: ['name', 'title'],
      },
    },
  },
};
