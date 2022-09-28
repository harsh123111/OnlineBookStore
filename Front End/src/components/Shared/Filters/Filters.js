import React, { useState } from "react"
import { InputLabel, Select, MenuItem, Grid, Button } from "@material-ui/core";
import { getCategories } from '../../../services/CategoryService'
import { getBooks } from "../../../services/BookingsService";
const Filters = ({ applyFilter, clearFilter }) => {
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [authorList, setAuthorList] = useState([])
    const [selectedPrice, setSelectedPrice] = useState()
    const [selectedRating, setSelectedRating] = useState()
    const [selectedAuthor, setSelectedAuthor] = useState()

    const loadCategoryList = () => {
        getCategories().then(res => {
          setCategoryList(res.data)
        })
    }
    
    const loadAuthors = () => {
        const temp = []
        getBooks().then(res => {
            res.data.forEach(x => {
                if (!temp.includes(x.author)) {
                    temp.push(x.author)
                } 
            })
            setAuthorList(temp)
        })
    }

    React.useEffect(() => {
        applyFilter(selectedCategory, selectedAuthor, selectedPrice, selectedRating)
    }, [selectedAuthor, selectedCategory, selectedPrice, selectedRating])

    React.useEffect(() => {
        loadCategoryList()
        loadAuthors()
    }, [])

    return (
        
            <Grid xl={12} container spacing={5}  justify="flex-end">
                <Grid xs={2} item>
                    <InputLabel htmlFor="agent-simple">Category</InputLabel>
                        <Select
                            style={{width:'100%'}}
                            onChange={e => setSelectedCategory(e.target.value) }
                            value={selectedCategory}
                            inputProps={{
                            name: "category",
                            id: "category"
                            }}
                        >
                        {categoryList.map(x => 
                            <MenuItem value={x.name}>{x.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid xs={2} item>
                    <InputLabel htmlFor="agent-simple">Price</InputLabel>
                        <Select
                            style={{width:'100%'}}
                            onChange={e => setSelectedPrice(e.target.value)}
                            value={selectedPrice}
                            inputProps={{
                            name: "price",
                            id: "price"
                            }}
                        >
                        <MenuItem value="lessThan500">{"Less than 500"}</MenuItem>
                        <MenuItem value="500to1000">{"500 < 1,000"}</MenuItem>
                        <MenuItem value="1000to5000">{"1,000 < 5,000"}</MenuItem>
                        <MenuItem value="moreThan5000">{"More than 5,000"}</MenuItem>
                    </Select>
                </Grid>
                <Grid xs={2} item>
                    <InputLabel htmlFor="agent-simple">Rating</InputLabel>
                        <Select
                            style={{width:'100%'}}
                            onChange={e => setSelectedRating(e.target.value)}
                            value={selectedRating}
                            inputProps={{
                            name: "rating",
                            id: "rating"
                            }}
                        >
                        <MenuItem value="lessThan3">Less than 3</MenuItem>
                        <MenuItem value="moreThan3">More than 3</MenuItem>
                    </Select>
                </Grid>
                <Grid xs={2} item>
                    <InputLabel htmlFor="agent-simple">Author</InputLabel>
                        <Select
                            style={{width:'100%'}}
                            onChange={e => setSelectedAuthor(e.target.value)}
                            value={selectedAuthor}
                            inputProps={{
                            name: "author",
                            id: "author"
                            }}
                        >
                        {authorList.map(x => 
                            <MenuItem value={x}>{x}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid xs={2} item>
                    <Button onClick={clearFilter}>Clear Filters</Button>
                </Grid>
            </Grid>
    )
}

export default Filters