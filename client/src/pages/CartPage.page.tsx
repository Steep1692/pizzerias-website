import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { CartPizzaType, PizzeriaType, SettingsType } from '@/types';
import { calculateTotal, dolarize } from '@/utils';
import { getPizzeriasRequest, getSettingsRequest, postOrderRequest } from '@/services';
import { PizzaItem } from '@/components';
import { AppRoute } from '@/constants';

type Props = {
  cartItems: CartPizzaType[];
  onRemoveFromCart: (id: string, pizzeriaId: string) => void;
  onIncreaseQuantity: (id: string, pizzeriaId: string) => void;
  onDecreaseQuantity: (id: string, pizzeriaId: string) => void;
}

export const CartPage: FC<Props> = ({
                                      cartItems,
                                      onRemoveFromCart,
                                      onIncreaseQuantity,
                                      onDecreaseQuantity,
                                    }) => {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [pizzerias, setPizzerias] = useState<PizzeriaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ordering, setOrdering] = useState<boolean>(false);

  useEffect(() => {
    const r1 = getSettingsRequest()
      .then(setSettings)
      .catch(console.log);

    const r2 = getPizzeriasRequest()
      .then(setPizzerias)
      .catch(console.log);

    Promise.all([r1, r2]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }, [])

  const order = () => {
    setOrdering(true);
    postOrderRequest(total)
      .then(() => {
        cartItems.forEach((pizza) => onRemoveFromCart(pizza.id, pizza.pizzeriaId));
        alert('Order has been placed successfully!');
      })
      .finally(() => setOrdering(false));
  };

  const pizzeriaIdToCountryMap = useMemo(() => {
    const out = new Map();

    if (pizzerias && settings) {
      for (const pizzeria of pizzerias) {
        out.set(pizzeria.id, pizzeria.country);
      }
    }

    return out;
  }, [pizzerias, settings]);

  const total = settings ? calculateTotal(cartItems, pizzeriaIdToCountryMap, settings.taxRateMap) : 0;

  return (
    <Grid minHeight="100%" container gap={ 2 } flexDirection="column">
      <Typography variant="h5">😎 Cart</Typography>

      { cartItems.map((pizza) => {
        return (
          <PizzaItem
            key={ pizza.id }
            hasCartView
            pizza={ pizza }
            quantity={ pizza.quantity || 0 }
            pizzeriaId={ pizza.pizzeriaId }
            onRemoveFromCart={ onRemoveFromCart }
            onIncreaseQuantity={ onIncreaseQuantity }
            onDecreaseQuantity={ onDecreaseQuantity }
          />
        );
      }) }

      {
        cartItems.length === 0 && (
          <Grid container flexGrow={ 1 } alignItems="center">
            <Typography align="center" width="100%" variant="h6" component="div">
              Cart is empty
              <br/>
              Go to the <RouterLink to={ AppRoute.Pizzerias }>Pizzerias</RouterLink> to add some pizzas ;)
            </Typography>
          </Grid>
        )
      }

      {
        cartItems.length > 0 && (
          <Typography width="100%" variant="h6" component="div">
            Total: {
            loading ? 'Loading taxes data…' : dolarize(total)
          }
          </Typography>
        )
      }

      {
        cartItems.length > 0 && (
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            style={{ height: '56px' }}
            disabled={ ordering }
            onClick={ order }
          >
            { ordering ? 'Ordering' : 'Place an Order' }
          </Button>
        )
      }
    </Grid>
  );
};
