import React,{useEffect, useContext, useState} from 'react'
import {Grid, List, Box, Avatar, ListItem, 
        CircularProgress, Typography, CardMedia,
        Card, CardActionArea, CardContent, Button,
        Dialog, DialogTitle, TextField} from '@material-ui/core';
import {useStyles} from '../styles';
import { listCategories, listProducts, removeFromOrder, addToOrder, clearOrder} from '../actions';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Alert} from '@material-ui/lab';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {Store} from '../Store'

function OrderScreen(props) {
    const styles = useStyles();
    const [categoryName, setCategoryName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState({});

    const closeHandler = () => {
        setIsOpen(false);
        
    }

    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen(true);
        setQuantity(1);
    }

    const addToOrderHandler = () => {
        addToOrder(dispatch, { ...product, quantity});
        setIsOpen(false);
        
        
    }

    const cancelOrRemoveFromOrder = () => {
        removeFromOrder(dispatch, product);
        setIsOpen(false);
    }

    const {state, dispatch} = useContext(Store);
    const {categories, loading, error} = state.categoryList;
    const {
        products,
        loading: loadingProducts,
        error: errorProducts
    } = state.productList;

    const {
        orderItems,
        itemsCount,
        totalPrice,
        taxPrice,
        orderType,
    } = state.order;
   

    useEffect(() => {
        if(!categories){
            listCategories(dispatch);
        }else{
            listProducts(dispatch, categoryName);
        }
        
    }, [dispatch, categories, categoryName]);
    
   
    const categoryClickHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch, categoryName);
    }

    const previewOrderHandler = () =>{
        props.history.push(`/review`)
    }

    return (
        <Box className={styles.root} style={{backgroundColor:'#ffb049'}}>
            <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={isOpen}
                onClose={closeHandler}
            >
              <DialogTitle className={styles.center}>
                  Add {product.name}
              </DialogTitle>  
              <Box className={[styles.row, styles.center]}>
                  {/* For decreasing item */}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={quantity === 1}
                    onClick={(e)=>quantity >1 && setQuantity(quantity -1)}
                  >
                    <RemoveIcon  />
                  </Button>
                  <TextField
                    inputProps={{className: styles.largeInput}}
                    InputProps={{
                        bar: true,
                        inputProps:{
                            className: styles.largeInput,
                        }
                    }}
                    className={styles.largeNumber}
                    type="number"
                    variant="filled"
                    min={1}
                    value={quantity}
                  />
                   {/* For increasing item */}
                   <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>setQuantity(quantity+1)}
                  >
                    <AddIcon  />
                  </Button> 
              </Box>
              <Box className={[styles.row, styles.around]}>
                  <Button
                    onClick={cancelOrRemoveFromOrder}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={styles.largeButton}
                  >
                    {orderItems.find((x) => x.name === product.name)
                        ? 'Remove From Order'
                        : 'Cancel'}
                  </Button>
                  <Button
                    onClick={addToOrderHandler}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={styles.largeButton}
                  >
                    Add To Order
                  </Button>
                  
              </Box>
            </Dialog>
            <Box className={styles.main}>
                <Grid container >
                    <Grid item>
                        <List>
                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Alert serverity="error">{error}</Alert>
                            ) : (
                                <>
                                <ListItem button onClick={() => categoryClickHandler('')}>
                                    <FastfoodIcon sx={{fontSize : 50, color: '#d52027'}}></FastfoodIcon>
                                </ListItem>
                                {categories.map((category) => (
                                    <ListItem button key={category.name} onClick={() => categoryClickHandler(category.name)}>
                                        <Avatar alt={category.name} src={category.image} />
                                    </ListItem>
                                ))}
                                </>
                            )}
                        </List>
                    </Grid>
                    <Grid item md={10} >
                        <Typography
                            gutterBottom
                            className={styles.title}
                            variant="h2"
                            component="h2"
                        >
                            {categoryName || 'Main Menu'}
                        </Typography>
                        <Grid container spacing={0.5}>
                            {loadingProducts ? (
                                <CircularProgress />
                            ) : errorProducts ? (
                                <Alert severity="error">{errorProducts}</Alert>
                            ) : (
                                products.map((product) => (
                                <Grid item md={6}>
                                    <Card className={styles.card} 
                                     onClick={()=> productClickHandler(product)}>
                                        <CardActionArea>
                                            <CardMedia
                                                component='img'
                                                alt={product.name}
                                                image={product.image}
                                                className={styles.media}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                    color="textPrimeary"
                                                    component="p"
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Box className={styles.cardFooter}>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {product.calorie} Cal
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textPrimary"
                                                        component="p"
                                                    >
                                                        ${product.price}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                ))
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box>
                    <Box className={[styles.bordered, styles.space]}>
                        May Order = {orderType} | Tax : ${taxPrice} | 
                        Total: ${totalPrice} | Items: {itemsCount}
                    </Box>
                    <Box className={[styles.row, styles.around]}>
                        <Button
                            onClick={()=>{
                                clearOrder(dispatch);
                                props.history.push(`/`)
                            }}
                            variant="contained"
                            className={styles.largeButton}>
                                Cancel Order
                        </Button>
                        <Button
                            onClick={previewOrderHandler}
                            variant="contained"
                            color="primary"
                            disabled={orderItems.length === 0}
                            className={styles.largeButton}>
                             Done
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default OrderScreen

