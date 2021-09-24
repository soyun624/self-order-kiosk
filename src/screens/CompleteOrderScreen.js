import React, {useContext, useEffect} from 'react';
import { Box, Typography, CircularProgress, Button } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useStyles} from '../styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Store} from '../Store';
import {createOrder} from '../actions'


function CompleteOrderScreen(props) {
    const styles = useStyles();
    const {state, dispatch} = useContext(Store);
    const {order} = state;
    const {loading, error, newOrder} = state.orderCreate;

    useEffect(() => {
        if(order.orderItems.length > 0){
            createOrder(dispatch, order)
        }
    }, [order])

    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                <FastfoodIcon sx={{fontSize : 120, color: '#ffb049', marginBottom: 3}}></FastfoodIcon>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                <>
                <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h3"
                    component="h3"
                    style={{margin:"0 20px 0 20px"}}
                >
                    Your order has been placed
                </Typography>
                <Typography
                    className={styles.title}
                    gutterBottom
                    style={{fontSize:"4rem", color:"#ffffff"}}
                >
                    Thank you!
                </Typography>
                <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h3"
                    component="h3"
                >
                    Your order number is {newOrder.number}
                </Typography>
                </>
                )}
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button
                    onClick={()=>props.history.push('/')}
                    variant="contained"
                    color="primary"
                    className={styles.largeButton}
                >
                    Order Again
                </Button>
            </Box>
    </Box>
    )
}

export default CompleteOrderScreen
