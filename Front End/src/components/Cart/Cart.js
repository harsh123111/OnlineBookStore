import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import { getCart, updateCart } from '../../services/CartService';

const Cart = ({ refreshCart }) => {
  const classes = useStyles();
  const [cartItems, setCartItems] = React.useState(getCart())
  const [total, setTotal] = React.useState(0)
  const user = JSON.parse(localStorage.getItem("user"))
  const onUpdateCartQty = (item, type) => {
    cartItems.map(x => {
      if (x.bookId === item.bookId) {
        type === '+' ? x.quantity = x.quantity + 1 : x.quantity > 1 ? x.quantity = x.quantity - 1 : x.quantity = x.quantity
      }
    })
    setCartItems([...cartItems])
    updateCart([...cartItems])
  }

  const onRemoveFromCart = (item) => {
    const temp = cartItems.filter(x => x.bookId !== item.bookId)
    setCartItems([...temp])
    updateCart([...temp])
    refreshCart()
  }

  const onEmptyCart = () => {
    setCartItems([])
    updateCart([])
    refreshCart()
  }

  const calculateTotal = () => {
    let cartTotal = 0
    cartItems.forEach(item => {
      cartTotal += parseInt(item.price) * parseInt(item.quantity)
    })
    setTotal(cartTotal)
  } 

  useEffect(() => {
    calculateTotal()
  }, [cartItems])

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your cart,
      <Link className={classes.link} to="/"> start adding some</Link>!
    </Typography>
  );

  const renderCart = () => (
    <>
    <div className={classes.cardDetails}>
      <Typography variant="h5" >Subtotal: <b >{total}</b></Typography>
        <div style={{marginBottom : "100px"}}>
          <Button variant={"outlined"} size="large" type="button" color="secondary" onClick={onEmptyCart}>Empty cart</Button>&nbsp;
          {user 
          ? <Button variant={"outlined"} component={Link} to="/checkout" size="large" type="button" >Checkout</Button>
          : <Button variant={"outlined"} component={Link} to="/Login/user" size="large" type="button" >Login</Button>}
        </div>
      </div>
      <Grid container spacing={4}>
        {cartItems.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.bookId}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom><b>Your Shopping Cart</b></Typography>
      <hr/>
      { !cartItems.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
