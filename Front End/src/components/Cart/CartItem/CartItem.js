import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia image={item.bookCover} alt={item.bookName} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.bookName}</Typography>
        <Typography variant="h6" color='secondary' >{item.price} Rs.</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
          <Button variant={"outlined"} color={"secondary"} type="button" size="small" onClick={() => onUpdateCartQty(item, '-')}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button variant={"outlined"} color={"secondary"} type="button" size="small" onClick={() => onUpdateCartQty(item, '+')}>+</Button>
        <Button variant={"outlined"} color={"secondary"} type="button" fullWidth onClick={() => onRemoveFromCart(item)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
