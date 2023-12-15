import { makeRequest } from './api';
import { mapPizzeria, mapPizzerias } from '@/mappers';
import { PizzeriaDtoType } from '@/dtos';

const ROUTE = '/pizzerias';

export const getPizzeriasRequest = () => {
  return makeRequest<PizzeriaDtoType[]>(ROUTE).then(mapPizzerias)
}
export const getPizzeriaByIdRequest = (id: string) => {
  return makeRequest<PizzeriaDtoType>(ROUTE + '/' + id).then(mapPizzeria)
}