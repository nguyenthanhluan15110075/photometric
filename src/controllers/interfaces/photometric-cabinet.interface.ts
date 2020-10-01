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
