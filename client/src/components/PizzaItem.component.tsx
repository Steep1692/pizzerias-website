import { FC } from 'react';
import { Button, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

import { PizzaType } from '@/types';
import { dolarize } from '@/utils';
import { MAX_PIZZA_QUANTITY } from '@/constants';

type Props = {
  hasCartView?: boolean;
  pizza: PizzaType;
  pizzeriaId: string;
  quantity: number;
  onAddToCart?: (id: string, pizzeriaId: string) => void;
  onRemoveFromCart: (id: string, pizzeriaId: string) => void;
  onIncreaseQuantity: (id: string, pizzeriaId: string) => void;
  onDecreaseQuantity: (id: string, pizzeriaId: string) => void;
}

export const PizzaItem: FC<Props> = ({
                                       hasCartView,
                                       quantity,
                                       pizza,
                                       pizzeriaId,
                                       onAddToCart,
                                       onRemoveFromCart,
                                       onIncreaseQuantity,
                                       onDecreaseQuantity,
                                     }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height={ hasCartView ? 64 : 256 }
        image={ pizza.imageUrl }
        alt={ pizza.name }
      />
      <CardContent>
        <Typography variant="h6" component="div">
          { pizza.name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: { dolarize(pizza.price) }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Taxed: { pizza.isTaxed ? 'Yes' : 'No' }
        </Typography>
        { !hasCartView && (
          <Typography variant="body2" color="text.secondary">
            Description: { pizza.description }
          </Typography>
        ) }
        {
          !quantity && (
            <Button
              variant="contained"
              color="primary"
              onClick={ () => onAddToCart?.(pizza.id, pizzeriaId) }
            >
              Add to cart
            </Button>
          )
        }
        {
          !!quantity && (
            <>
              <Typography variant="body2" color="text.secondary">
                Quantity: { quantity }
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={ () => onRemoveFromCart(pizza.id, pizzeriaId) }
              >
                Remove from cart
              </Button>
              <IconButton disabled={quantity === MAX_PIZZA_QUANTITY} color="primary" onClick={ () => onIncreaseQuantity(pizza.id, pizzeriaId) }>
                <AddIcon/>
              </IconButton>
              <IconButton disabled={quantity === 1} color="primary" onClick={ () => onDecreaseQuantity(pizza.id, pizzeriaId) }>
                <RemoveIcon/>
              </IconButton>
            </>
          )
        }
      </CardContent>
    </Card>
  );
};