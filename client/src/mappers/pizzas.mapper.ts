import { PizzaType } from '@/types';
import { PizzaDtoType } from '@/dtos';

export const mapPizza = (pizza: PizzaDtoType): PizzaType => ({
  id: pizza.id.toString(),
  name: pizza.name,
  description: pizza.description,
  price: parseFloat(pizza.price),
  imageUrl: pizza.image_url,
  isTaxed: pizza.is_taxed,
  availableInPizzerias: pizza.available_in_pizzerias.map(id => id.toString()),
})

export const mapPizzas = (pizzas: PizzaDtoType[]): PizzaType[] => pizzas.map(mapPizza)