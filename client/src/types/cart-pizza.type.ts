import { PizzaType } from './pizza.type';

export type CartPizzaType = PizzaType & {
  pizzeriaId: string
  quantity: number
}