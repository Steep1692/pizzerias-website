import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home as HomeIcon, Favorite as FavoriteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material'

import { AppRoute } from '@/constants';
import { getPizzeriaIdFromRoute, isPizzeriaRoute, makePizzeriaRoute } from '@/utils';

export const AppBottomNavigation = () => {
  const [lastPizzeriaId, setLastPizzeriaId] = useState<string | null>(null);
  const location = useLocation();

  const navigate = useNavigate();

  const isPizzeriasPage = isPizzeriaRoute(location.pathname)

  // Tracks LastPizzeria Id
  useEffect(() => {
    if (isPizzeriasPage) {
      const pizzeriaId = getPizzeriaIdFromRoute(location.pathname);
      setLastPizzeriaId(pizzeriaId);
    }
  }, [isPizzeriasPage, location.pathname]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    const route = newValue === AppRoute.Pizzeria ? makePizzeriaRoute(lastPizzeriaId) : newValue;

    navigate(route);
  }

  return (
    <BottomNavigation
      showLabels
      style={{
      zIndex: 1,
      position: 'sticky',
      bottom: '32px',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
      borderRadius: '10px',
      overflow: 'hidden',
    }}
      value={isPizzeriasPage ? AppRoute.Pizzeria : location.pathname}
      onChange={handleChange}
    >
      <BottomNavigationAction value={AppRoute.Pizzerias} label="Pizzerias" icon={<HomeIcon />} />
      <BottomNavigationAction
        value={AppRoute.Pizzeria}
        label="Pizzeria"
        disabled={!lastPizzeriaId}
        icon={<FavoriteIcon />}
        style={{ color: !lastPizzeriaId ? 'rgba(0, 0, 0, 0.26)' : '' }}
      />
      <BottomNavigationAction value={AppRoute.Cart} label="Cart" icon={<ShoppingCartIcon />} />
    </BottomNavigation>
  )
};