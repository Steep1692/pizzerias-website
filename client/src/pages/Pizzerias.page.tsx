import React, { useEffect, useState } from 'react';
import { Card, CardContent, CircularProgress, Grid, List, ListItem, styled, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { getPizzeriasRequest } from '@/services';
import { PizzeriaType } from '@/types';
import { makePizzeriaRoute } from '@/utils';

const CardStyled = styled(Card)({
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#eee', // Replace with your hover color
  },
  '&:active': {
    backgroundColor: '#ddd', // Replace with your active color
  },
});

export const PizzeriasPage = () => {
  const [pizzerias, setPizzerias] = useState<PizzeriaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPizzeriasRequest()
      .then(setPizzerias)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Grid container gap={ 2 } flexDirection="column">
      <Typography variant="h5" gutterBottom>
        🍕 Our Pizzerias
      </Typography>

      { loading ? (
        <CircularProgress/>
      ) : (
        <List>
          {
            pizzerias.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No pizzerias found yet, please check back later ;)
              </Typography>
            )
          }
          { pizzerias.map((pizzeria) => (
            <ListItem
              key={ pizzeria.id }
              component={ RouterLink }
              to={ makePizzeriaRoute(pizzeria.id) }
            >
              <CardStyled style={ { width: '100%' } }>
                <CardContent>
                  <Typography variant="h6" component="div">
                    { pizzeria.name }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: { pizzeria.address }
                  </Typography>
                </CardContent>
              </CardStyled>
            </ListItem>
          )) }
        </List>
      ) }
    </Grid>
  );
};
