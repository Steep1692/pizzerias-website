import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';
import { AppRoute } from '@/constants';

export const NotFoundPage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might be in another castle. 🏰
      </Typography>
      <Button component={Link} to={AppRoute.Pizzerias} variant="contained" color="primary">
        Go To Repository Search
      </Button>
    </Container>
  );
};
