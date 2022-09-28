import React from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import Rating from 'react-rating';
import star from '../../../assets/star.png';
import eStar from '../../../assets/emptyStar.png';
import { Link } from 'react-router-dom';
import { getCart } from '../../../services/CartService';

const Product = ({ product, onAddToCart }) => {

  return (
    <Grid item>
      <Card
        style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          style={{height: '300px'}}
          component="img"
          sx={{
            pt: '56.25%',
          }}
          image={product.bookCover}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }} style={{ paddingBottom: 0 }}>
         
            <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product-view/${product.bookId}`}>
              <b>{product.bookName}</b><br/>
            </Link>
            <b><small>{product.author}.</small></b>
            </Typography>
          <Typography>
            {product.description.slice(0, 50)}
          </Typography>
          <Grid container justify="space-between" style={{paddingTop:'10px'}}>  
            <Typography inline variant="body1" align="left" ><b>{product.categoryName}</b></Typography>
            <Typography inline variant="body1" align="right" color={"secondary"}><b>{product.price}&nbsp;Rs.</b></Typography>
          </Grid>
          <Rating
            initialRating={product.rating}
            readonly
            emptySymbol={<img alt="star" src={eStar} className="icon" />}
            fullSymbol={<img alt="star" src={star} className="icon" />}
          /><br/>
          <small style={{float:'right', marginTop:'-4%'}}>By {product.publisherName}</small>
        </CardContent>
        <CardActions>
          <Button variant={"outlined"} 
          color={"secondary"} 
          disabled={getCart().filter(x => x.bookId === product.bookId).length}  
          fullWidth 
          onClick={() => onAddToCart(product)}>{`${getCart().filter(x => x.bookId === product.bookId).length ? 'Added to cart' : 'Add to cart' }`}</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Product;