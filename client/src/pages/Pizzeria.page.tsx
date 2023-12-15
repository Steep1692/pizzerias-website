import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';

import { getPizzasRequest, getPizzeriaByIdRequest } from '@/services';
import { CartPizzaType, PizzaType, PizzeriaType } from '@/types';
import { PizzaItem } from '@/components';
import { getRandomArrayItem } from '@/utils';
import { AppRoute, pizzeriaEmoji } from '@/constants';

type Props = {
  cartItems: CartPizzaType[];
  onAddToCart: (id: string, pizzeriaId: string) => void;
  onRemoveFromCart: (id: string, pizzeriaId: string) => void;
  onIncreaseQuantity: (id: string, pizzeriaId: string) => void;
  onDecreaseQuantity: (id: string, pizzeriaId: string) => void;
}

export const PizzeriaPage: FC<Props> = ({
                                          cartItems,
                                          onAddToCart,
                                          onRemoveFromCart,
                                          onIncreaseQuantity,
                                          onDecreaseQuantity,
                                        }) => {
  const { id } = useParams<{ id: string }>();
  const [pizzeria, setPizzeria] = useState<PizzeriaType>(null);
  const [pizzas, setPizzas] = useState<PizzaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPizzasRequest(id)
      .then(setPizzas)
      .catch(console.log)
      .finally(() => setLoading(false));

    getPizzeriaByIdRequest(id)
      .then(setPizzeria)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Grid container gap={2}>
      <Paper style={{
        zIndex: 1,
        position: 'sticky',
        top: '0px',
      }}>
        <Typography variant="h5" px={1} letterSpacing={2}>
          { getRandomArrayItem(pizzeriaEmoji) }
          &nbsp;
          { pizzeria?.name || 'Loading…' }
        </Typography>
      </Paper>

      { loading ? (
        <CircularProgress/>
      ) : (
        <Grid container gap={2} flexDirection="column" minHeight="100%">
          {
            pizzas.length === 0 && (
              <Grid container height="100%" alignItems="center">
                <Typography align="center" width="100%" variant="h6" component="div">
                  No pizzas found yet, please check back later ;)
                  <br/>
                  Go to the <Link to={ AppRoute.Pizzerias }>Pizzerias</Link> to find another pizzeria ;)
                </Typography>
              </Grid>
            )
          }
          {
            pizzas.map((pizza) => {
              const cartItem = cartItems.find((item) => item.id === pizza.id);

              return (
                <PizzaItem
                  key={ pizza.id }
                  pizza={ pizza }
                  quantity={ cartItem?.quantity || 0 }
                  pizzeriaId={ id }
                  onAddToCart={ onAddToCart }
                  onRemoveFromCart={ onRemoveFromCart }
                  onIncreaseQuantity={ onIncreaseQuantity }
                  onDecreaseQuantity={ onDecreaseQuantity }
                />
              );
            })
          }
        </Grid>
      ) }
    </Grid>
  );
};
