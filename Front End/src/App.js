import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import ProductView from './components/ProductView/ProductView';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Grid } from '@mui/material';
import Dashboard from './components/Admin/Dashboard';
import UserProfile from './components/Admin/UserProfile/UserProfile';
import Admin from './components/Admin/AdminSection/Admin';
import Bookings from './components/Admin/Bookings/Bookings';
import Books from './components/Admin/Books/Books';
import Feedback from './components/Admin/Feedback/Feedback';
import Logout from './components/Admin/Logout/Logout';
import Publisher from './components/Admin/Publisher/Publisher';
import Users from './components/Admin/Users/Users';
import Categories from './components/Admin/Categories/Categories';
import { getCart, updateCart } from './services/CartService';
import UserBookings from './components/Bookings/Bookings';
import ForgotPassword from './components/Login/ForgotPassword';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [totalCartItems, setTotalCarItems] = useState(getCart().length)

  const onAddCart = (item) => {
    const cartItems = getCart()
    item["quantity"] = 1
    setTotalCarItems(cartItems.length + 1)
    updateCart([...cartItems, item])
  }

  const refreshCart = () => {
    setTotalCarItems(getCart().length)
  }

  return (
    <div>
        <Router>
          <CssBaseline /> 
          {!window.location.pathname.includes("admin") && <Grid  container>
            <Navbar totalItems={totalCartItems} handleDrawerToggle={handleDrawerToggle} />
            <Switch>
              <Route exact path="/" >
                <Products onAddCart={onAddCart} />
              </Route>
              <Route exact path="/cart" >
                <Cart refreshCart={refreshCart} />
              </Route>
              <Route path="/checkout" exact>
                <Checkout refreshCart={refreshCart}/>
              </Route>
              <Route path="/product-view/:id" exact>
                <ProductView onAddCart={onAddCart} />
              </Route>
              <Route path="/login/:type" exact>
                <Login />
              </Route>
              <Route path="/forgot-password" exact>
                <ForgotPassword />
              </Route>
              <Route path="/sign-up" exact>
                <SignUp />
              </Route>
              <Route path="/user-bookings" exact>
                <UserBookings />
              </Route>
            </Switch>
          </Grid>}
          {/* Admin Routes */}
          {window.location.pathname.includes("admin") && <div>
            <Switch>
              <Route exact path="/admin/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/admin/profile">
                <UserProfile />
              </Route>
              <Route exact path="/admin/admins">
                <Admin />
              </Route>
              <Route exact path="/admin/bookings">
                <Bookings />
              </Route>
              <Route exact path="/admin/books">
                <Books />
              </Route>
              <Route exact path="/admin/feedback">
                <Feedback />
              </Route>
              <Route exact path="/admin/logout">
                <Logout />
              </Route>
              <Route exact path="/admin/publisher">
                <Publisher />
              </Route>
              <Route exact path="/admin/users">
                <Users />
              </Route>
              <Route exact path="/admin/categories">
                <Categories />
              </Route>
              <Route path="/login/:type" exact>
                <Login />
              </Route>
              <Route path="/sign-up" exact>
                <SignUp />
              </Route>
            </Switch>
          </div>}
        </Router>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
