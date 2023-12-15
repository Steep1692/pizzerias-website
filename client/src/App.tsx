import { FC, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';

import { AppBottomNavigation, AppRoutes } from '@/partials';
import { CartPage, NotFoundPage, PizzeriaPage, PizzeriasPage } from '@/pages';
import { CartPizzaType } from '@/types';
import { getPizzaByIdRequest } from '@/services';

const App: FC = () => {
  const [cartItems, setCartItems] = useState<CartPizzaType[]>([]);

  const handleAddToCart = async (id: string, pizzeriaId: string) => {
    const pizzaItem = await getPizzaByIdRequest(pizzeriaId, id);

    const cartPizzaItem: CartPizzaType = {
      ...pizzaItem,
      quantity: 1,
      pizzeriaId,
    };

    setCartItems((prevCartItems) => [...prevCartItems, cartPizzaItem]);
  };

  const changeQuantity = (id: string, pizzeriaId: string, delta: number) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];
      const pizzaIndex = newCartItems.findIndex((item) => item.id === id && item.pizzeriaId === pizzeriaId);
      const pizzaItem = newCartItems[pizzaIndex];
      pizzaItem.quantity += delta;
      return newCartItems;
    });
  };

  const increaseQuantity = (id: string, pizzeriaId: string) => {
    changeQuantity(id, pizzeriaId, +1);
  };

  const decreaseQuantity = (id: string, pizzeriaId: string) => {
    changeQuantity(id, pizzeriaId, -1);
  };

  const handleRemoveFromCart = (id: string, pizzeriaId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id && item.pizzeriaId !== pizzeriaId));
  };

  return (
    <Container
      maxWidth="sm"
      component={ Grid }
      py={ 2 }
      minHeight="100vh"
      style={ { display: 'grid' } }
      gridTemplateColumns={ { xs: '1fr' } }
      gridTemplateRows={ { xs: '1fr auto' } }
    >
      <Paper>
        <Grid container p={ 2 } pb={ 5 } minHeight="100%">
          <AppRoutes
            PizzeriasPage={ <PizzeriasPage/> }
            PizzeriaPage={ <PizzeriaPage
              cartItems={ cartItems }
              onAddToCart={ handleAddToCart }
              onRemoveFromCart={ handleRemoveFromCart }
              onIncreaseQuantity={ increaseQuantity }
              onDecreaseQuantity={ decreaseQuantity }
            /> }
            CartPage={ <CartPage
              cartItems={ cartItems }
              onRemoveFromCart={ handleRemoveFromCart }
              onIncreaseQuantity={ increaseQuantity }
              onDecreaseQuantity={ decreaseQuantity }
            /> }
            NotFoundPage={ <NotFoundPage/> }
          />
        </Grid>
      </Paper>

      <AppBottomNavigation/>

    </Container>
  );
};

export default App;