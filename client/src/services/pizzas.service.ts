import { makeRequest } from './api.service';
import { mapPizza, mapPizzas } from '@/mappers';
import { PizzaDtoType } from '@/dtos';

const ROUTE = '/pizzas';

export const getPizzasRequest = (pizzeriaId: string) => {
  return makeRequest<PizzaDtoType[]>(ROUTE + '/' + pizzeriaId).then(mapPizzas)
};
export const getPizzaByIdRequest = (pizzeriaId: string, id: string) => {
  return makeRequest<PizzaDtoType>(ROUTE + '/' + pizzeriaId + '/' + id).then(mapPizza)
}
