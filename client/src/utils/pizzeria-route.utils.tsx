import { AppRoute } from '@/constants';

export const makePizzeriaRoute = (id: string) => {
  return AppRoute.Pizzeria.replace(':id', id);
}

export const getPizzeriaIdFromRoute = (route: string) => {
  return route.split('/').pop();
}

export const isPizzeriaRoute = (route: string) => {
  return makePizzeriaRoute(getPizzeriaIdFromRoute(route)) === route
}