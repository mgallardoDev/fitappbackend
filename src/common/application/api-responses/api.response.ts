import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  status: HttpStatus;
  message?: string;
  data?: T;
  error?: Error;
  path?: string;
  method?: string;
  timestamp?: string;
}

export interface ErrorResponse {
  error: Error;
  
}

export interface GetManyResponse<T> {
  result: T[];
  count: number;
}

export enum ApiResponses {
  CREATED = 'Registro creado con exito',
  UPDATED = 'Registro actualizado con exito',
  DELETED = 'Registro eliminado con exito',
  GET_ONE = 'Registro encontrado',
  NOT_FOUND = 'Registro no encontrado',
  GET_MANY = 'Lista de registros encontrados',
}
