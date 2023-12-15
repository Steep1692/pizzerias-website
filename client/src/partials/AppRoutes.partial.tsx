import { FC, ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '@/constants';

type Props = {
  PizzeriasPage: ReactNode;
  PizzeriaPage: ReactNode;
  CartPage: ReactNode;
  NotFoundPage: ReactNode;
}

export const AppRoutes: FC<Props> = ({ PizzeriasPage, PizzeriaPage, CartPage, NotFoundPage }) => (
  <Routes>
    <Route index path={AppRoute.Pizzerias} element={PizzeriasPage}/>
    <Route path={AppRoute.Pizzeria} element={PizzeriaPage}/>
    <Route path={AppRoute.Cart} element={CartPage}/>
    <Route element={NotFoundPage} />
  </Routes>
);