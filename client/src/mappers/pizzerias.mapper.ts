import { PizzeriaType } from '@/types';
import { PizzeriaDtoType } from '@/dtos';

export const mapPizzeria = (item: PizzeriaDtoType): PizzeriaType => ({
  id: item.id.toString(),
  name: item.name,
  address: item.address,
  country: item.country
})

export const mapPizzerias = (pizzas: PizzeriaDtoType[]): PizzeriaType[] => pizzas.map(mapPizzeria)