import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, Input, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo1 from "../../assets/2.jpeg";
import logo2 from "../../assets/4.jpeg";
import logo3 from "../../assets/3.jpeg";
import { Link } from "react-router-dom";
import Filters from "../Shared/Filters/Filters.js";
import { getBooks } from "../../services/BookingsService.js";

const Products = ({ onAddCart }) => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [contentToShow, setContentToShow] = useState(4)
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  const [isClearFilter, setClearFilter] = useState(false)

  const loadMore = () => {
    setContentToShow(contentToShow + 10)
  }

  const loadBooks = () => {
    getBooks().then(res => {
      setProducts(res.data)
      setProductsCopy(res.data)
    })
  }

  const onApplyFilter = (selectedCategory, selectedAuthor, selectedPrice, selectedRating) => {
    let temp = []
    if (!selectedCategory && !selectedAuthor && !selectedPrice && !selectedRating) {
      setProducts([...productsCopy])
      return
    }
    if (selectedCategory) {
      temp = productsCopy.filter(x => x.categoryName === selectedCategory)
    }
    if (selectedAuthor) {
      temp = productsCopy.filter(x => x.author === selectedAuthor)
    }
    if (selectedPrice) {
      switch(selectedPrice) {
        case 'lessThan500' : temp = productsCopy.filter(x => x.price <= 500)
          break
        case '500to1000' : temp = productsCopy.filter(x => x.price > 500 && x.price <= 1000)
          break
        case '1000to5000' : temp = productsCopy.filter(x => x.price > 1000 && x.price <= 5000)
          break
        case 'moreThan5000' : temp = productsCopy.filter(x => x.price > 5000)
          break
      }
    }
    if (selectedRating) {
      if (selectedRating === 'lessThan3') {
        temp = productsCopy.filter(x => x.rating < 3)
      } else {
        temp = productsCopy.filter(x => x.rating >= 3)
      }
    }
    setProducts(temp)
  }

  const clearFilter = () => {
    setClearFilter(true)
    setTimeout(() => {
      setClearFilter(false)
    }, 100);
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <main className={classes.content} >
      <div className={classes.toolbar} />
      <Carousel fade infiniteLoop useKeyboardArrows autoPlay>
        <Carousel.Item>
          <img className="d-block w-100" src={logo1} alt=" slide" />
          <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="default"
              href="#pro"
            >
              Explore
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={logo3} alt="Second slide" />
          <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="secondary"
              component={Link}
              to="/cart"
            >
              Checkout Cart
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={logo2} alt="Second slide" />
          <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="primary"
              href="#foot"
            >
              Other Works
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Grid container spacing={2} rowSpacing={3} justify="flex-end">
        <Grid sm={9} item>
          <div className={classes.searchs}>
            {!isClearFilter && <Filters applyFilter={onApplyFilter} clearFilter={clearFilter} />}
          </div>
        </Grid>
        <Grid sm={3}>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </Grid>
      </Grid>
      <Grid className={classes.content} container justify="center" spacing={5}>
        {products.length ? products
          .filter((product) => {
            if (searchTerm === "") {
              return product;
            } else if (
              product.bookName
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} id="pro">
              <Product product={product} onAddToCart={onAddCart} />
            </Grid>
          )).slice(0, contentToShow) : <h4 style={{textAlign:'center'}}>No records</h4>}
      </Grid>
      {(products.length > contentToShow) && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant={"outlined"} style={{ maxHeight: '50px', minHeight: '50px', width: '400px' }} color={"secondary"} onClick={loadMore}>Load More</Button>
      </div>}
    </main>
  );
};

export default Products;
