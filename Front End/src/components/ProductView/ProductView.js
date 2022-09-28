import React, { useState, useEffect } from 'react'
import './style.css'
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { getBooks } from "../../services/BookingsService.js";
import TextField from '@mui/material/TextField';
import { addComment, getComment } from '../../services/CommentService';

const ProductView = ({ onAddCart }) => {

  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"))

  const fetchProduct = async () => {
    getBooks().then(res => {
      const data = res.data.filter(x => x.bookId === parseInt(id))
      setProduct(data[0])
    })
  };
  
  const fetchComment = () => {
    getComment(id).then(res => {
      setComments(res.data)
    })
  }

  const onComment = (event) => {
    addComment(user.userId, id, event.target.value, new Date().toLocaleString()).then(res => {
      document.getElementById('comment').value = ''
      const commentContainer = document.getElementById('commentContainer')
      commentContainer.scrollTop = commentContainer.scrollHeight + 100;
      fetchComment()
    })
  }

  useEffect(() => {
    fetchProduct()
    fetchComment()
  }, [id]);

  return (
    <Container className="product-view">
      <Grid container style={{ paddingTop: "5%" }}>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'end' }} className="image-wrapper">
          <img src={product.bookCover} alt={product.bookName}
            style={{ width: "65%", height: "650px" }}
          />
        </Grid>
        <Grid item xs={12} md={4} className="text">
          <Typography variant="h2"><b>{product.bookName}</b></Typography>
          <hr />
          <Typography variant="p" >{product.description} </Typography><br />
          <Typography variant="h3" color="secondary" ><b> Price:  {product.price} </b> </Typography>
          <br />
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button variant={"outlined"} color={"secondary"} fullWidth component={Link} to='/' >
                Continue
              </Button>&nbsp;
            </Grid>
            <Grid item xs={6}>
              <Button variant={"outlined"} color={"secondary"} fullWidth onClick={() => onAddCart(product)} >Add to cart</Button>
            </Grid>
            {user && <b>Comments :</b> }
            {user ? <Grid style={{ border: "1px solid" }} item xs={12}>
              <Grid id="commentContainer" item style={{ minHeight: "200px", maxHeight: "310px", overflowY: "auto" }}>
                {comments.map(x => (<>
                  <Typography variant="span" component={"b"}>
                    {x.userName}
                    <span style={{ float: 'right' }}>{x.commentDate}</span>
                  </Typography><br />
                  <Typography variant="p" > {x.comment} </Typography>
                  <hr />
                </>))}
              </Grid>
              <TextField
                id="comment"
                name="comment"
                label="Add your comment"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onKeyDown={e => e.key === 'Enter' && onComment(e)}
              />
            </Grid> : <Button variant={"outlined"} color={"secondary"} fullWidth component={Link} to='/login/user'>
              Login
            </Button>}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
