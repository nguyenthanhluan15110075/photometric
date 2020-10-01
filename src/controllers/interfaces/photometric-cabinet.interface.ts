export interface CreatePhotometricCabinetInput {
  name: string;
  description: string;
  attributes?: {
    firmware?: string;
    hardware?: string;
  }
}

export interface CreatePhotometricCabinetResponse {
  _id: string;
  name?: string;
  description?: string;
  attributes?: {
    firmware?: string;
    hardware?: string;
  }
}

export interface PhotometricCabinetUpdate {
  name?: string;
  description?: string;
  attributes?: {
    firmware?: string;
    hardware?: string;
  }
  createdAt?: number;
  updatedAt?: number;
}
